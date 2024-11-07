import { Component } from '@angular/core';
import { Produto } from '../../interfaces/Produto';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaginatedResponse } from '../../../utils/interfaces/PaginatedResponse';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-list-produtos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardModule, TableModule, PaginatorModule, RouterModule],
  providers: [ProdutoService],
  templateUrl: './list-produtos.component.html',
  styleUrl: './list-produtos.component.scss'
})
export class ListProdutosComponent {

  produtos: Produto[] = [];
  totalRecords: number = 0;
  page: number = 1;
  size: number = 10;
  categoriaId: number | null = null;

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const categoriaId = params.get('id');
      if (categoriaId) {
        this.categoriaId = +categoriaId;
        this.loadProdutosByCategoria();
      } else {
        this.categoriaId = null;
        this.loadAllProdutos();
      }
    });
  }

  loadAllProdutos() {
    this.produtoService.getAll(this.page, this.size).subscribe((data: PaginatedResponse<Produto>) => {
      this.produtos = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  loadProdutosByCategoria() {
    if (this.categoriaId) {
      this.produtoService.getProdutosByCategoria(this.categoriaId, this.page, this.size).subscribe((data: PaginatedResponse<Produto>) => {
        this.produtos = data.content;
        this.totalRecords = data.totalElements;
      });
    }
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    if (this.categoriaId) {
      this.loadProdutosByCategoria();
    } else {
      this.loadAllProdutos();
    }
  }

  deleteProduto(id: number) {
    this.produtoService.delete(id).subscribe(() => {
      this.produtos = this.produtos.filter(produto => produto.id !== id);
    });
  }

  isListEmpty(list: any[]): boolean {
    return list.length === 0;
  }

}
