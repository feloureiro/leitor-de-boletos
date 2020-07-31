

Um projeto em node usando Typescript que implementa um leitor de linha digitável para boletos.

--------------------- SETUP DO PROJETO -------------------------------------

Para rodar o projeto é necessário ter o Node e o npm instalado. Com isso é necessário rodar os seguintes comandos: 
1. '$ npm install' para instalar todas as dependências 
2. '$ npm run dev' para rodar a aplicação em modo desenvolvimento

Por utilizar Typescript, foram feitas alterações no package.json para transpilar o código quando o arquivo for salvo e fazer um hot reaload com o nodemon.

---------------------- USO DA API ----------------------------------------

Após rodar em modo desenvolvimento, é possível acessar o retorno das task via browser seguindo o seguinte padrão:

http://localhost:3030/{linhaDigitavel}

A linha digitável deve ser inserida sem espaços e sem pontuação.