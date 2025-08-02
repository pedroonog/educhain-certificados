import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import abi from "../blockchain/abi.json";

const contractAddress = "0x03bC6C80A8990A640Bf390cdF43Bc51581a148B6"; //

export default function ValidarCertificado() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const codigoQuery = query.get("c");

  useState(() => {
    if (codigoQuery) {
      setCodigo(codigoQuery);
      validar(codigoQuery);
    }
    // eslint-disable-next-line
  }, []);

  async function validar(cod) {
    setErro("");
    setResultado(null);
    setCarregando(true);
    try {
      // BASE MAINNET provider:
      const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
      const contrato = new ethers.Contract(contractAddress, abi, provider);
      const cert = await contrato.validarCertificado(cod);
      if (cert[0] && cert[0].length > 0) {
        setResultado({
          nomeAluno: cert[0],
          curso: cert[1],
          dataConclusao: cert[2],
          instituicao: cert[3],
          email: cert[4],
        });
      } else {
        setErro("Certificado não encontrado.");
      }
    } catch (e) {
      setErro(e?.info?.error?.message || e?.message || "Certificado não encontrado ou inválido.");
    }
    setCarregando(false);
  }

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h2>Validar Certificado</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validar(codigo);
        }}
        style={{ marginBottom: 20 }}
      >
        <input
          type="text"
          placeholder="Digite o código do certificado"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          style={{ minWidth: 320, padding: 8 }}
        />
        <br />
        <button type="submit" style={{ marginTop: 16 }} disabled={carregando}>
          {carregando ? "Validando..." : "Validar"}
        </button>
      </form>
      {carregando && <span style={{ color: "#2196f3" }}>Consultando blockchain Base...</span>}
      {erro && <div style={{ color: "red" }}>{erro}</div>}

      {resultado && (
        <div
          style={{
            margin: "0 auto",
            maxWidth: 380,
            border: "1px solid #4caf50",
            padding: 24,
            borderRadius: 8,
            background: "#eafbe7",
          }}
        >
          <h4>Certificado Válido</h4>
          <p>
            <strong>Nome:</strong> {resultado.nomeAluno}
            <br />
            <strong>Curso:</strong> {resultado.curso}
            <br />
            <strong>Data de Conclusão:</strong> {resultado.dataConclusao}
            <br />
            <strong>Instituição:</strong> {resultado.instituicao}
            <br />
            {resultado.email && (
              <>
                <strong>E-mail:</strong> {resultado.email}
                <br />
              </>
            )}
            <strong>Código:</strong> {codigo}
          </p>
        </div>
      )}
    </div>
  );
}
