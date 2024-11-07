package com.join.categoria_produto_api.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.join.categoria_produto_api.entities.Produto;
import com.join.categoria_produto_api.exceptions.ResourceNotFoundException;
import com.join.categoria_produto_api.services.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping
    public Page<Produto> getProdutos(@RequestParam(value = "page") int page,
            @RequestParam(value = "size") int size) {
        Pageable pageable = PageRequest.of(page <= 1 ? 0 : page - 1, size);
        return produtoService.findAllProdutos(pageable);
    }

    @GetMapping("/categoria/{categoriaId}")
    public Page<Produto> getProdutosByCategoria(@PathVariable Long categoriaId,
            @RequestParam(value = "page") int page,
            @RequestParam(value = "size") int size) {
        Pageable pageable = PageRequest.of(page <= 1 ? 0 : page - 1, size);
        return produtoService.findProdutosByCategoria(categoriaId, pageable);
    }

    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto, @RequestParam(value = "categoriaId") Long categoriaId) {
        Produto novoProduto = produtoService.salvarProduto(produto, categoriaId);
        return ResponseEntity.ok(novoProduto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Long id) {
        Optional<Produto> produto = produtoService.findProdutoById(id);
        return produto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto,
            @RequestParam Long categoriaId) {
        try {
            Produto updatedProduto = produtoService.updateProduto(id, produto, categoriaId);
            return ResponseEntity.ok(updatedProduto);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        try {
            produtoService.deleteProduto(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
