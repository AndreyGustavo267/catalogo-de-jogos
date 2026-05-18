# IGDb - Catálogo de Jogos

O Internet Game Database (IGDb) é uma Single Page Application (SPA) desenvolvida para a disciplina de SPODWE2. Inspirado em plataformas consolidadas como IMDb e Steam, o projeto atua como um catálogo colaborativo onde os usuários podem descobrir novos títulos, compartilhar avaliações e gerenciar o histórico de seus jogos favoritos.

## Funcionalidades

- Página Inicial Dinâmica: Carrosséis interativos de destaque e navegação fluida guiada por categorias.
- Listagem e Filtros Avançados: Exploração do Top 50 Melhores Jogos com opções de refinamento e busca rápida.
- Sistema de Autenticação:
    - Criação de conta e login simulados (com persistência de dados em memória e LocalStorage).
    - Gerenciamento e controle de sessão global utilizando a Context API do React.
    - Rotas Privadas: Controle de acesso para páginas exclusivas de usuários autenticados (ex: "Minhas Avaliações").
- Interface Moderna: Design responsivo e imersivo com Dark Mode nativo, desenvolvido com a biblioteca Ant Design.

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes ferramentas e tecnologias:
- React (v19) - Biblioteca JavaScript para a construção de interfaces de usuário.
- Vite - Ferramenta de build e servidor de desenvolvimento de alta performance.
- React Router DOM (v7) - Biblioteca padrão para roteamento dinâmico na SPA.
- Ant Design - Biblioteca robusta de componentes de interface de usuário (UI).

## Como Executar o Projeto Localmente

Siga o passo a passo abaixo para configurar e rodar o ambiente de desenvolvimento em sua máquina:

1. Clone o repositório
```
git clone https://github.com/AndreyGustavo267/catalogo-de-jogos.git
```
2. Acesse o diretório do projeto
```
cd catalogo-de-jogos
```
3. Instale as dependências
Nota: Certifique-se de ter o Node.js instalado em sua máquina (recomenda-se a versão 20.19+ ou 22.12+).
```
npm install
```
4. Inicie o servidor de desenvolvimento
```
npm run dev
```
5. Acesse a aplicação
Abra o seu navegador web e acesse o endereço fornecido no terminal (geralmente http://localhost:5173).
