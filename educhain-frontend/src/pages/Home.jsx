import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>EduChain</h1>
      <Link to="/emitir">
        <button>Emitir Certificado</button>
      </Link>
      <br /><br />
      <Link to="/validar">Validar Certificado</Link>
    </div>
  );
}
