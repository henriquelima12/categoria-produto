import { Component } from '@angular/core';
import { Produto } from '../../interfaces/Produto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CategoriaService } from '../../../categoria/services/categoria.service';
import { Categoria } from '../../../categoria/interfaces/Categoria';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiSelectModule, HttpClientModule, ButtonModule],
  providers: [ProdutoService, CategoriaService],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss'
})
export class ProdutoFormComponent {

  produtoForm: FormGroup;
  produtoId: number | null = null;
  isEditMode = false;
  categorias: Categoria[] | undefined = [];

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required]],
      preco: [Number, [Validators.required]],
      categoria: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoId = +id;
      this.isEditMode = true;
      this.loadProduto(this.produtoId);
    }
    this.loadCategorias();
  }

  loadProduto(id: number) {
    this.produtoService.getById(id).subscribe((produto: Produto) => {
      this.produtoForm.setValue({
        nome: produto.nome,
        preco: produto.preco,
        categoria: String(produto.categoria.id)
      });
    });
  }

  loadCategorias() {
    this.categoriaService.getAll().subscribe((data: Categoria[]) => {
      console.log(data)
      this.categorias = data;
    });
  }

  onSubmit() {
    if (this.produtoForm.invalid) return;

    const produto: Produto = this.produtoForm.value;
    console.log(produto)

    if (this.isEditMode) {
      this.produtoService.update(this.produtoId!, produto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    } else {
      this.produtoService.create(produto).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }

}
