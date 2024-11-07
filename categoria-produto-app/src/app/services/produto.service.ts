import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../utils/interfaces/PaginatedResponse';
import { Produto } from '../produto/interfaces/Produto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<PaginatedResponse<Produto>> {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<PaginatedResponse<Produto>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}?categoriaId=${produto.categoria}`, produto);
  }

  update(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}?categoriaId=${produto.categoria}`, produto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProdutosByCategoria(categoriaId: number, page: number, size: number): Observable<PaginatedResponse<Produto>> {
    const params = { page: page.toString(), size: size.toString() };
    return this.http.get<PaginatedResponse<Produto>>(`${this.apiUrl}/categoria/${categoriaId}`, { params });
  }

}
