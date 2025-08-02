import { useLocation, useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../blockchain/abi.json";

const contractAddress = "0x03bC6C80A8990A640Bf390cdF43Bc51581a148B6"; // 

export default function CertificadoGerado() {
  const location = useLocation();
  const { hashCert } = useParams();
  const [dados, setDados] = useState(location.state || null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchFromBlockchain() {
      setCarregando(true);
      setErro("");
      try {
        // BASE MAINNET provider:
        const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
        const contrato = new ethers.Contract(contractAddress, abi, provider);
        const cert = await contrato.validarCertificado(hashCert);
        if (cert[0] && cert[0].length > 0) {
          setDados({
            nomeAluno: cert[0],
            curso: cert[1],
            dataConclusao: cert[2],
            instituicao: cert[3],
            email: cert[4],
            hashCert,
          });
        } else {
          setErro("Certificado não encontrado.");
        }
      } catch (e) {
        setErro(e?.info?.error?.message || e?.message || "Erro ao buscar certificado.");
      }
      setCarregando(false);
    }
    if (!location.state) {
      fetchFromBlockchain();
    }
    // eslint-disable-next-line
  }, [hashCert, location.state]);

  const linkValidacao = `${window.location.origin}/validar?c=${hashCert}`;

  function baixarPDF() {
    if (!dados) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Certificado EduChain", 10, 20);
    doc.setFontSize(12);
    doc.text(`Nome: ${dados.nomeAluno || ""}`, 10, 35);
    doc.text(`Curso: ${dados.curso || ""}`, 10, 45);
    doc.text(`Data de Conclusão: ${dados.dataConclusao || ""}`, 10, 55);
    doc.text(`Instituição: ${dados.instituicao || ""}`, 10, 65);
    doc.text(`E-mail: ${dados.email || ""}`, 10, 75);
    doc.text(`Código de verificação: ${hashCert}`, 10, 90);
    doc.text("Valide seu certificado em:", 10, 105);
    doc.text(linkValidacao, 10, 115);
    doc.save("certificado-educhain.pdf");
  }

  if (carregando) return <div style={{ textAlign: "center", marginTop: 60 }}>Carregando dados do certificado...</div>;
  if (erro) return <div style={{ textAlign: "center", marginTop: 60, color: "red" }}>{erro}</div>;
  if (!dados) return null;

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Certificado Gerado com Sucesso!</h2>
      <div style={{ margin: "0 auto", maxWidth: 380, border: "1px solid #ccc", padding: 24, borderRadius: 8 }}>
        <p><strong>Nome:</strong> {dados.nomeAluno}</p>
        <p><strong>Curso:</strong> {dados.curso}</p>
        <p><strong>Data de Conclusão:</strong> {dados.dataConclusao}</p>
        <p><strong>Instituição:</strong> {dados.instituicao}</p>
        {dados.email && <p><strong>E-mail:</strong> {dados.email}</p>}
        <p><strong>Código de Verificação:</strong> <code>{hashCert}</code></p>
        <div style={{ margin: "20px 0" }}>
          <QRCodeCanvas value={linkValidacao} size={128} />
          <p style={{ fontSize: 12, marginTop: 8 }}>
            Escaneie para validar<br />ou acesse:<br />
            <a href={linkValidacao} target="_blank" rel="noopener noreferrer">
              {linkValidacao}
            </a>
          </p>
        </div>
        <button onClick={baixarPDF}>Baixar PDF do Certificado</button>
        <br /><br />
        <Link to="/emitir">
          <button>Emitir Novo Certificado</button>
        </Link>
        <br /><br />
        <Link to="/validar">Validar Certificado</Link>
      </div>
    </div>
  );
}
