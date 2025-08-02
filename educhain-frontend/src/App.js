import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmitirCertificado from "./pages/EmitirCertificado";
import CertificadoGerado from "./pages/CertificadoGerado";
import ValidarCertificado from "./pages/ValidarCertificado";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emitir" element={<EmitirCertificado />} />
        <Route path="/certificado/:hashCert" element={<CertificadoGerado />} />
        <Route path="/validar" element={<ValidarCertificado />} />
      </Routes>
    </Router>
  );
}

export default App;
