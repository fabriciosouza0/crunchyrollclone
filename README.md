# CrunchyrollClone

CrunchyrollClone é uma plataforma para assistir filmes, séries e animes, com o design inspirado na antiga versão da Crunchyroll. O projeto visa proporcionar uma experiência imersiva e nostálgica para os amantes de conteúdo audiovisual.

## Hospedagem

O projeto está disponível online e pode ser acessado através do seguinte endereço:  
**[https://crunchyroll-clone-app-f6419.web.app](https://crunchyroll-clone-app-f6419.web.app)**

## Como Configurar Localmente

### 1. Clone o Repositório

Faça o clone do repositório para sua máquina local utilizando o comando:

```bash
git clone https://github.com/seu-usuario/crunchyrollclone.git
```

### 2. Instale o Angular CLI
Se você ainda não possui o Angular CLI instalado, execute o seguinte comando para instalá-lo globalmente:

```bash
npm install -g @angular/cli
```

### 3. Instale as Dependências

Navegue até o diretório do projeto e execute o seguinte comando para instalar todas as dependências:

```bash
npm install
```

### 4. Crie dois arquivos no diretório src/environments/:
#### environment.ts para o ambiente de desenvolvimento
#### environment.prod.ts para o ambiente de produção
#### Parao o ambiente de desenvolvimento, utilize:

```bash
export const environment = { 
  production: false,
  apiKey: "", 
  baseApiUrl: "https://api.themoviedb.org/3/",
  baseImgUrl: "https://image.tmdb.org/t/p/",
  baseStreamUrl: "https://embed.warezcdn.link/",
};
```
#### Para o ambiente de produção, utilize:
```bash
export const environment = { 
  production: true,
  apiKey: "", 
  baseApiUrl: "https://api.themoviedb.org/3/",
  baseImgUrl: "https://image.tmdb.org/t/p/",
  baseStreamUrl: "https://embed.warezcdn.link/",
};
```

### 5. Obtenha uma API Key do The Movie Database (TMDb)
Para que o projeto funcione corretamente, você precisará de uma API Key do The Movie Database (TMDb). Siga os passos abaixo para conseguir uma:

Crie uma conta no TMDb se ainda não tiver uma.
Após fazer login, vá até a seção de API.
Solicite uma API Key.
Copie o Token JWT fornecido e cole no campo apiKey dos arquivos environment.ts e environment.prod.ts.

### 6. Executando o Projeto
Após configurar os arquivos de ambiente e instalar as dependências, você pode iniciar o servidor de desenvolvimento com o seguinte comando:

```bash
ng serve
```

Agora, o projeto estará disponível em:
http://localhost:4200/.

# Tecnologias Utilizadas
### Angular: Framework para construção de SPA (Single Page Applications).
### Firebase Hosting: Plataforma de hospedagem de sites.
### The Movie Database API (TMDb): Utilizada para obter informações de filmes, séries e animes.

# Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo, modificá-lo e distribuí-lo.