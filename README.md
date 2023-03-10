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
TOKEN_EXPIRATION=<TEMPO EM DIAS DE VALIDADE DO TOKEN>
~~~
* __`PORT`__ - Define a porta em que a API será executada.
* __`CONNECTION_STRING`__ - É a string de conexão com o banco de dados MongoDB.
* __`TOKEN_SECRET`__ - É a chave secreta usada para autenticar os tokens.
* __`TOKEN_EXPIRATION`__ - Esta variável define o tempo de validade dos seus tokens em dias.
### Iniciando a API
Após instalar as dependências e configurar as variáveis de ambiente, a API pode ser iniciada executando o seguinte comando:
~~~
npm start
~~~
Para executar a API em um ambiente de desenvolvimento, execute o comando:
~~~
npm run dev
~~~
## Criação de Usuário e Geração de Token
Para ter acesso aos recursos da aplicação, é necessário criar um usuário e gerar um token de acesso. Siga os passos abaixo:
## Criar usuário
Rota: POST /usuario/
Para ter acesso ao recusos é necessario criar o usuario e gera um token
O JSON deve ter a seguinte estrutura:
~~~
{
  "email": "email@gmail.com",
  "password": "123456"
}
~~~
O e-mail deve ser um endereço de e-mail válido e a senha deve ter pelo menos 6 caracteres.
## Gerrar token de acesso
Após criar o usuário, você poderá gerar sua chave token para acessar os recursos da aplicação. Utilize a seguinte rota:

Rota: POST /token/ 

## Recursos da api
### Cadastro de Produtos
Rota: POST /produto/

O cadastro de produtos deve seguir a seguinte estrutura JSON:
~~~
{
  "code": "19",
  "description": "Leite Condensado 395g",
  "price": 3.99,
}
~~~


### Buscar todos os produtos

Rota: GET /produto/


### Alterar preço do produto
Rota: PUT /produto/preco/:code

Exemplo de JSON a ser enviado no Body:
~~~
{ "price": "5.99" }
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
* [Validator](https://www.npmjs.com/package/validator)

### Dev Dependencies
* [Eslint](https://www.npmjs.com/package/eslint)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Sucrase](https://www.npmjs.com/package/sucrase)


