# 🚀 EduChain Certificados

> Certificados digitais imutáveis, auditáveis e fáceis de validar, agora rodando 100% na Base Mainnet.

---

## 🛡️ O que é?

EduChain é uma plataforma open source para **emissão e validação de certificados** acadêmicos ou profissionais diretamente na blockchain (Base Mainnet), garantindo segurança, transparência e combate à fraude.

- 🌐 **Frontend:** React + ethers.js
- 🔗 **Blockchain:** Base Mainnet (EVM)
- 🔑 **Smart Contract:** Solidity
- 📄 **Certificados em PDF + QR Code**
- 🟢 **Open Source**

---

## ✨ Funcionalidades

- **Emissão descentralizada:** qualquer certificado registrado é permanente e público
- **Validação instantânea:** por hash, QR Code ou código do certificado
- **PDF personalizado:** para download e impressão
- **Suporte completo à rede Base Mainnet**
- **Integração simples via React**

---

## 🚩 Endereço do Contrato na Base Mainnet

0xSEU_ENDERECO_DO_CONTRATO

yaml
Copiar
Editar

> [Ver no BaseScan](https://basescan.org/address/0xSEU_ENDERECO_DO_CONTRATO)

---

## 🎥 Como funciona?

1. **Usuário acessa a plataforma** (web).
2. Preenche os dados do certificado.
3. Conecta a MetaMask na Base Mainnet e confirma a emissão.
4. O certificado fica **registrado para sempre na blockchain**.
5. Qualquer pessoa pode validar pelo código/hash/QR code.

---

## 🖥️ Prints

<div align="center">
  <img src="https://imgur.com/placeholderprint1.png" width="400" alt="Tela de emissão" />
  <img src="https://imgur.com/placeholderprint2.png" width="400" alt="Tela de validação" />
</div>

---

## ⚡ Como rodar localmente

```bash
# Clone o repo
git clone https://github.com/seu-usuario/educhain-certificados.git
cd educhain-certificados

# Instale as dependências
npm install

# Rode o projeto localmente
npm start
🔗 Requisitos
Node.js e npm instalados

MetaMask configurada na Base Mainnet para emissão

Para validação, qualquer navegador

📦 .env e Variáveis de Ambiente
Este projeto não depende de .env para endereço do contrato. Edite diretamente em src/pages/EmitirCertificado.jsx, ValidarCertificado.jsx, etc.

🛠️ Estrutura do Projeto
css
Copiar
Editar
src/
  pages/
    EmitirCertificado.jsx
    ValidarCertificado.jsx
    CertificadoGerado.jsx
    Home.jsx
  blockchain/
    abi.json
  utils/
    gerarHashCertificado.js
  App.js
🤝 Contribuindo
Pull requests são muito bem-vindos! Sinta-se livre para sugerir melhorias, traduções, integração com NFT, etc.


📲 Contato
Dúvidas, sugestões ou quer usar comercialmente?
Entre em contato pelo LinkedIn ou email: pedro.lopes.nogueira@hotmail.com

<p align="center"><b>EduChain: o seu certificado, para sempre na blockchain.</b></p> ```