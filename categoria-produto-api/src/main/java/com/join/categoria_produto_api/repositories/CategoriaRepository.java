package com.join.categoria_produto_api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.join.categoria_produto_api.dtos.CategoriaDTO;
import com.join.categoria_produto_api.entities.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT new com.join.categoria_produto_api.dtos.CategoriaDTO(c.id, c.nome) FROM Categoria c")
    Page<CategoriaDTO> findAllCategoriasPaginado(Pageable pageable);
}
