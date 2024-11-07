package com.join.categoria_produto_api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.join.categoria_produto_api.entities.Categoria;
import com.join.categoria_produto_api.entities.Produto;
import com.join.categoria_produto_api.exceptions.ResourceNotFoundException;
import com.join.categoria_produto_api.repositories.CategoriaRepository;
import com.join.categoria_produto_api.repositories.ProdutoRepository;

import jakarta.transaction.Transactional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Page<Produto> findAllProdutos(Pageable pageable) {
        return produtoRepository.findAll(pageable);
    }

    public Page<Produto> findProdutosByCategoria(Long categoriaId, Pageable pageable) {
        return produtoRepository.findByCategoriaId(categoriaId, pageable);
    }

    @Transactional
    public Produto salvarProduto(Produto produto, Long categoriaId) {
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        produto.setCategoria(categoria);
        return produtoRepository.save(produto);
    }

    public Optional<Produto> findProdutoById(Long id) {
        return produtoRepository.findById(id);
    }

    public Produto updateProduto(Long id, Produto updatedProduto, Long categoriaId) {
        return produtoRepository.findById(id)
                .map(produto -> {
                    produto.setNome(updatedProduto.getNome());
                    produto.setPreco(updatedProduto.getPreco());
                    Categoria categoria = categoriaRepository.findById(categoriaId)
                        .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
                    produto.setCategoria(categoria);
                    return produtoRepository.save(produto);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com o ID: " + id));
    }

    public void deleteProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produto não encontrado com o ID: " + id);
        }
        produtoRepository.deleteById(id);
    }
}
