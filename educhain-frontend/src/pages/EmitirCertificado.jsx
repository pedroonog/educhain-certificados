import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gerarHashCertificado } from "../utils/gerarHashCertificado";
import { ethers } from "ethers";
import abi from "../blockchain/abi.json";

const contractAddress = "0x03bC6C80A8990A640Bf390cdF43Bc51581a148B6"; // 

export default function EmitirCertificado() {
  const [form, setForm] = useState({
    nomeAluno: "",
    curso: "",
    dataConclusao: "",
    instituicao: "",
    email: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    if (!form.nomeAluno || !form.curso || !form.dataConclusao || !form.instituicao) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    const hashReal = gerarHashCertificado(form);

    try {
      setCarregando(true);
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contrato = new ethers.Contract(contractAddress, abi, signer);

        const tx = await contrato.emitirCertificado(
          form.nomeAluno,
          form.curso,
          form.dataConclusao,
          form.instituicao,
          form.email,
          hashReal
        );
        await tx.wait();

        navigate(`/certificado/${hashReal}`, { state: { ...form, hashCert: hashReal } });
      } else {
        setErro("MetaMask não encontrada!");
      }
    } catch (error) {
      if (error?.info?.error?.message) {
        setErro(error.info.error.message);
      } else if (error?.message) {
        setErro(error.message);
      } else {
        setErro("Erro desconhecido ao registrar certificado.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h2>Emitir Certificado</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left", marginTop: 32 }}>
        <label>
          Nome do Aluno*:<br />
          <input type="text" name="nomeAluno" value={form.nomeAluno} onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Nome do Curso*:<br />
          <input type="text" name="curso" value={form.curso} onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Data de Conclusão*:<br />
          <input type="date" name="dataConclusao" value={form.dataConclusao} onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Instituição*:<br />
          <input type="text" name="instituicao" value={form.instituicao} onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          E-mail do Aluno:<br />
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        <br /><br />
        <button type="submit" disabled={carregando}>
          {carregando ? "Emitindo..." : "Emitir Certificado"}
        </button>
        <br /><br />
        {carregando && <span style={{ color: "#2196f3" }}>Aguarde, enviando para blockchain Base...</span>}
        {erro && <span style={{ color: "red" }}>{erro}</span>}
      </form>
    </div>
  );
}
