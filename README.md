# Documentação da Aplicação
A aplicação é um sistema de gerenciamento de produtos com integração de categorias. Utiliza um backend robusto em Java com Spring Boot e JPA para gerenciamento de dados e um frontend moderno em Angular, com PrimeNG para a interface do usuário.

# Tecnologias Utilizadas
* Java 17
* Spring Boot 3
* JPA e Hibernate
* Angular 18
* PrimeNG
* PostgreSQL
* Docker

# Pré-requisitos
* Java 17
* Node.js (minímo v18.13) e Angular CLI
* Docker

# Configuração e Execução do projeto (Back-end)
### Clone o repositório
```
git clone (https://github.com/henriquelima12/categoria-produto.git
cd categoria-produto-api
```

### Construa o arquivo jar
```./mvnw clean package```

### Subir os contâiners para a aplicação e para o banco de dados
```docker compose up```

# Configuração e Execução do projeto (Front-end)
```
cd categoria-produto-app
npm install
```

### Buildar a aplicação e servi-la localmente
```ng serve```

### Acesse a aplicação em http://localhost:4200.

# Endpoints da API

### Endpoints de Categorias
* GET /categorias?page=1&size=10: Lista todas as categorias de maneira paginada.
* GET /categorias/all: Lista todas as categorias.
* GET /categorias/{id}: Retorna uma categoria pelo ID.
* POST /categorias: Cria uma nova categoria (Passar no body objeto com atributo nome. ex: {"nome": "Eletrônicos"}).
* PUT /categorias/{id}: Atualiza uma categoria (Passar no body objeto com atributo nome. ex: {"nome": "Eletrônicos"}).
* DELETE /categorias/{id}: Exclui uma categoria.

### Endpoints de Produtos
* GET /produtos?page=1&size=10: Lista todos os produtos de maneira paginada.
* GET /produtos/categoria/{categoriaId}?page=1&size=10: Lista de maneira paginada todos os produtos pertencentes à uma categoria.
* GET /produtos/{id}: Retorna um produto pelo ID.
* POST /produtos?categoriaId=1: Cria um novo produto (Passar no body objeto com atributos nome e preco. ex: {"nome": "Smartphone", "preco": 3000.00}. Além disso, passar no query param o valor do id da categoria desejada).
* PUT /produtos/{id}?categoriaId=1: Atualiza um produto (Passar no body objeto com atributos nome e preco. ex: {"nome": "Smartphone", "preco": 3000.00}. Além disso, passar no query param o valor do id da categoria desejada).
* DELETE /produtos/{id}: Exclui um produto.

# Validações e Regras de Negócio
### Campos obrigatórios para categoria: Nome é obrigatório ao criar uma categoria.
### Campos Obrigatórios para produto: Nome, preço e categoria são obrigatórios ao criar um produto.
### Associação de Categoria: Produtos devem estar associados a uma categoria válida.
### Preço Numérico: O campo preco deve aceitar valores numéricos, incluindo decimais.

# Informações adicionais
### Docker Compose
Para simplificar a execução do backend e do banco de dados, foi utilizado o arquivo docker-compose.yml:

```
version: '2'

services:
  app:
    image: 'categoria-produto-api:latest'
    build:
      context: .
    container_name: app
    ports:
      - "8080:8080" 
    depends_on:
      - db
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/compose-postgres
      - SPRING_DATASOURCE_USERNAME=compose-postgres
      - SPRING_DATASOURCE_PASSWORD=compose-postgres
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update
          
  db:
    image: 'postgres:13.1-alpine'
    container_name: db
    environment:
      - POSTGRES_USER=compose-postgres
      - POSTGRES_PASSWORD=compose-postgres
```

### Script para build e execução
Foi desenvolvido um script que automatiza o processo de construção do projeto com o Maven e, em seguida, inicia o Docker Compose para subir os containers da aplicação e do banco de dados.

```./run.sh```

Obs*: caso seja necessário atribuir permissão de execução ao arquivo:

```chmod +x run.sh```
