# 🛍️ Amazon Scraper

Aplicação fullstack para buscar produtos da Amazon com base em uma palavra-chave. O backend utiliza Puppeteer e JSDOM para renderizar e extrair os dados da Amazon, e o frontend exibe os resultados de forma simples e amigável.

---

## 📦 Tecnologias Utilizadas

### Backend:
- Node.js
- Express
- Puppeteer
- JSDOM
- CORS

### Frontend:
- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

- git clone https://github.com/ClaytonLucas/amazon-scraper.git
- cd amazon-scraper 

### 2. Configure e inicie o backend

- cd backend
- npm install
- node server.js

O servidor será iniciado em:
📍 http://localhost:3000

### 3. Rode o frontend

Abra o arquivo frontend/index.html diretamente no navegador
ou utilize a extensão Live Server do VSCode.

---
## Observações técnicas

### ❌ Por que não usamos apenas axios + jsdom?
Inicialmente, o scraping seria feito com axios para obter o HTML da página da Amazon e jsdom para parsear o conteúdo.
No entanto, a Amazon carrega grande parte das informações dinamicamente com JavaScript.
Por isso, o conteúdo necessário não estava presente no HTML retornado pelo axios.

### ✅ Solução adotada
Foi utilizado o puppeteer, que simula um navegador real e renderiza a página com JavaScript.
Assim, conseguimos capturar os produtos carregados dinamicamente e depois analisar o HTML com jsdom.
