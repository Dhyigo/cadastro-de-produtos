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
PORT=<aqui vai o número da porta do servidor express>
CONNECTION_STRING=<aqui vai sua sua conecção com o mongoDB>
TOKEN_SECRET=<aqui vai uma palavra secreta para o seu token>

~~~
### Execute a api
Apos terminar de instalar as depenciar inicie a apt digitando
o seguinte comando no terminal para testar em produção
~~~
npm start
~~~
Ou rode ```npm run dev``` para um ambiente de desenvolvimento
