# R4X — site

Landing page estática (HTML + CSS + JS, sem build) implementada a partir do Figma
(`R4X`, frame `8:63`, 1920px).

```
index.html
css/base.css    fontes (@font-face), tokens de cor/tipografia e reset
css/style.css   seções e responsivo
js/main.js      menu mobile, abas de Soluções, carrossel de depoimentos, faixa de parceiros
assets/fonts    Helvetica Now Display (WOFF2)
assets/img      imagens (WebP)
assets/icons    ícones e logos (SVG)
```

Para visualizar, abra `index.html` ou sirva a pasta:

```bash
python3 -m http.server 8000
```

## A preencher

- Destino dos botões "Fale conosco" / "Falar conosco" (hoje apontam para `#contato`).
- Links do Instagram e do LinkedIn no rodapé (hoje `#`).
- Depoimentos: o texto do Figma é *lorem ipsum*; para adicionar ou trocar, edite os
  `<figure class="testimonial">` em `index.html`.
- Logos dos parceiros: o Figma usa o logo da R4X como marcador; troque os `<img>` em
  `.partners__track`.
