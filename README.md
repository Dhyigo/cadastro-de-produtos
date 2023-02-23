# cadastro-de-produtos
Se trata de uma api-rest para cadastrar produtos. usando mongoDB e expresse


## Rodar a api
### Installar as depenecias
~~~
npm i 
~~~
### Criar arquivo __.env__
Antes de executar o arquivo você deverar criar um arquivo chamado __.env__
contendo as variaveis de ambiente, com a seguinte estrutura:
~~~
PORT="3000"
CONNECTION_STRING="SUA CONECÇÃO COM MONDODB"
TOKEN_SECRET="SUA PALAVRA SECRETA DO TOKEN"

~~~
### Execute a api
Apos terminar de instalar as depenciar inicie a apt digitando
o seguinte comando no terminal para testar em produção
~~~
npm start
~~~
Ou rode ```npm run dev``` para um ambiente de desenvolvimento
