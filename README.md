# API de Cadastro de Produtos
Esta é uma API REST para cadastro de produtos que utiliza o MongoDB como banco de dados e o framework Express.
## Executando a API
### Instalação das dependências
Para instalar as dependências necessárias, abra o terminal e execute o seguinte comando:
~~~
npm i
~~~
### Configuração das variáveis de ambiente
Antes de executar a API, é necessário criar um arquivo __.env__ na raiz do projeto contendo as variáveis de ambiente com a seguinte estrutura:
~~~
PORT=3000
CONNECTION_STRING=<SUA CONEXÃO COM O MONGODB>
TOKEN_SECRET=<SUA PALAVRA SECRETA DO TOKEN>
~~~
A variável __`PORT`__ define a porta em que a API será executada. __`CONNECTION_STRING`__ é a string de conexão com o banco de dados MongoDB. __`TOKEN_SECRET`__ é a chave secreta usada para autenticar os tokens.
### Iniciando a API
Após instalar as dependências e configurar as variáveis de ambiente, a API pode ser iniciada executando o seguinte comando:
~~~
npm start
~~~
Para executar a API em um ambiente de desenvolvimento, execute o comando:
~~~
npm run dev
~~~

## Recursos da api
### Cadastro de Produtos
Rota: POST /produto/

O cadastro de produtos deve seguir a seguinte estrutura JSON:
~~~
{
    "codigo": "2",
    "descricao": "Leite em Po Semidesnatado 350g",
    "preco": "69.99"
}
~~~


### Buscar todos os produtos

Rota: GET /produto/


### Alterar preço do produto
Rota: PUT /produto/preco/:code

Exemplo de JSON a ser enviado no Body:
~~~
{ "preco": "5.99" }
~~~


### Pesquisar produto por código
Rota: GET /produto/:code


### Pesquisar produto por descrição
Rota: GET /produto/descricao/:description

## Bibliotecas utilizadas:
### Dependencies
* [Express](https://www.npmjs.com/package/express)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs)

### Dev Dependencies
* [Eslint](https://www.npmjs.com/package/eslint)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Sucrase](https://www.npmjs.com/package/sucrase)


