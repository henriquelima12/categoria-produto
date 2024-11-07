import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../interfaces/Categoria';

@Component({
  selector: 'app-create-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ButtonModule],
  providers: [CategoriaService],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent {

  categoriaForm: FormGroup;
  categoriaId: number | null = null;
  isEditMode = false;

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nome: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoriaId = +id;
      this.isEditMode = true;
      this.loadCategoria(this.categoriaId);
    }
  }

  loadCategoria(id: number) {
    this.categoriaService.getById(id).subscribe((categoria) => {
      this.categoriaForm.setValue({
        nome: categoria.nome,
      });
    });
  }

  onSubmit() {
    if (this.categoriaForm.invalid) return;

    const categoria: Categoria = this.categoriaForm.value;

    if (this.isEditMode) {
      this.categoriaService.update(this.categoriaId!, categoria).subscribe(() => {
        this.router.navigate(['/categorias']);
      });
    } else {
      this.categoriaService.create(categoria).subscribe(() => {
        this.router.navigate(['/categorias']);
      });
    }
  }

}
