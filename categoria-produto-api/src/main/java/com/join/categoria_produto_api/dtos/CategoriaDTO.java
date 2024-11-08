package com.join.categoria_produto_api.dtos;

public class CategoriaDTO {
    private Long id;
    private String nome;

    public CategoriaDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
