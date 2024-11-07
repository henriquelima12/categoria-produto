package com.join.categoria_produto_api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.join.categoria_produto_api.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Page<Produto> findAll(Pageable pageable);

    Page<Produto> findByCategoriaId(Long categoriaId, Pageable pageable);

}
