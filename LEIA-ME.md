# Site — Popeye Lanches e Pizzaria

Site estático (HTML + CSS + JS puro). Não precisa de build: é só hospedar a pasta
(Netlify, Vercel, GitHub Pages, Hostinger etc.).

## Estrutura
```
index.html        página única (Home, Cardápio, Sobre, Galeria, Avaliações, Contato)
css/style.css     visual (cores na seção :root)
js/config.js      WhatsApp, horários, links e lista de fotos da galeria
js/cardapio.js    itens, descrições e preços do cardápio
js/main.js        funcionamento (status aberto/fechado, carrinho, banner)
img/              fotos
```

## Antes de publicar
1. **WhatsApp** — em `js/config.js`, confirme o número em `whatsapp` (hoje está o fixo 47 3349-8941).
2. **Cardápio e preços** — `js/cardapio.js` tem itens e preços de EXEMPLO. Troque pelo cardápio real.
3. **Fotos** — coloque em `img/` com estes nomes (ou altere os nomes no código):
   - `img/hero-pizza.jpg`, `img/hero-burger.jpg`, `img/hero-pastel.jpg` (banner, ~1920×1080)
   - `img/salao.jpg` (seção Sobre, vertical ~1000×1250)
   - `img/galeria/*.jpg` (lista em `js/config.js` → `galeria`)
   Enquanto a foto não existir, aparece um fundo colorido no lugar.
4. **Depoimentos** — em `index.html` (seção `#avaliacoes`) os textos são resumos de elogios.
   Substitua por trechos reais de avaliações (com autorização) se preferir.
5. **Acessibilidade / iFood / Facebook** — confirme se o espaço é acessível a cadeirantes,
   adicione o link do iFood em `config.js` se houver e troque o link do Facebook pela página oficial.

## Testar localmente
```bash
npx http-server -p 5500
```
e abra http://localhost:5500
