# Proposta para estética automotiva

Landing page comercial estática para apresentar o sistema de gestão para empresas de estética automotiva.

## Estrutura

- `index.html` — proposta completa.
- `assets/` — imagens e prévias usadas pela página.

## Publicar no Cloudflare Pages

1. Crie um novo projeto no Cloudflare Pages conectado a este repositório.
2. Escolha a implantação por Git.
3. Use a raiz do projeto como diretório de publicação.
4. Como é uma página estática, deixe o comando de build vazio.
5. Publique com `index.html` como arquivo de entrada.

Se preferir publicar pela linha de comando, use a pasta deste repositório como diretório de conteúdo estático no fluxo do Cloudflare Pages.

## Desenvolvimento local

Abra `index.html` no navegador ou sirva a pasta com qualquer servidor HTTP estático.

As imagens usam caminhos relativos, então o diretório `assets/` precisa permanecer junto do `index.html`.
