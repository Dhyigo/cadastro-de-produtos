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
Apos terminar de instalar as depenciar e criar configurar as variaveis de ambiente você pode inicie a apt digitando
o seguinte comando no terminal:
~~~
npm start
~~~
Ou escreva ```npm run dev``` para um ambiente de desenvolvimento

## Cadastrar produtos
o cadastro dos produtos devem ter a seguinte estrutura de JSON:
~~~
{
    "codigo": "2", 
    "descricao": "Leite em Po Semidesnatado 350g", 
    "preco": "69.99"
}
~~~
