package com.join.categoria_produto_api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.join.categoria_produto_api.dtos.CategoriaDTO;
import com.join.categoria_produto_api.entities.Categoria;
import com.join.categoria_produto_api.exceptions.ResourceNotFoundException;
import com.join.categoria_produto_api.repositories.CategoriaRepository;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> findAllCategorias() {
        return categoriaRepository.findAll();
    }

    public Page<CategoriaDTO> findAllCategoriasPaginado(Pageable pageable) {
        return categoriaRepository.findAllCategoriasPaginado(pageable);
    }

    public Categoria salvarCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Optional<Categoria> findCategoriaById(Long id) {
        return categoriaRepository.findById(id);
    }

    public Categoria updateCategoria(Long id, Categoria updatedCategoria) {
        return categoriaRepository.findById(id)
            .map(categoria -> {
                categoria.setNome(updatedCategoria.getNome());
                return categoriaRepository.save(categoria);
            })
            .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com o ID: " + id));
    }

    public void deleteCategoria(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categoria não encontrada com o ID: " + id);
        }
        categoriaRepository.deleteById(id);
    }

}
