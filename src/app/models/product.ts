export class Product {
  readonly descripcion: string;
  readonly precio_base: number;

  constructor({ descripcion, precio_base }: { descripcion: string; precio_base: number }) {
    this.descripcion = descripcion;
    this.precio_base = precio_base;
  }
}
