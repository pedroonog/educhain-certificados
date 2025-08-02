import SHA256 from "crypto-js/sha256";

export function gerarHashCertificado({ nomeAluno, curso, dataConclusao, instituicao }) {
  return SHA256(nomeAluno + "|" + curso + "|" + dataConclusao + "|" + instituicao).toString();
}
