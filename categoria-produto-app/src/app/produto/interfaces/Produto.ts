import { Categoria } from "../../categoria/interfaces/Categoria";

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    categoria: Categoria;
}