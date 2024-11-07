import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/Categoria';
import { PaginatedResponse } from '../../../utils/interfaces/PaginatedResponse';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-categorias',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardModule, TableModule, PaginatorModule, RouterModule],
  providers: [CategoriaService],
  templateUrl: './list-categorias.component.html',
  styleUrl: './list-categorias.component.scss'
})
export class ListCategoriasComponent {

  categorias: Categoria[] = [];
  totalRecords: number = 0;
  page: number = 1;
  size: number = 10;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getAllPaginated(this.page, this.size).subscribe((data: PaginatedResponse<Categoria>) => {
      console.log(data)
      this.categorias = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    this.loadCategorias();
  }

  deleteCategoria(id: number) {
    this.categoriaService.delete(id).subscribe(() => {
      this.categorias = this.categorias.filter(categoria => categoria.id !== id);
    });
  }

  isListEmpty(list: any[]): boolean {
    return list.length === 0;
  }

}
