#!/bin/bash

echo "Compilando o projeto com o Maven..."
./mvnw clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "Projeto compilado com sucesso!"
    
    echo "Subindo containers..."
    docker-compose up --build
else
    echo "Falha ao compilar o projeto. Verifique os erros acima."
fi