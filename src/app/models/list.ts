export class List {
  readonly nombre: string;
  readonly porcentaje: number;

  constructor({
    nombre,
    porcentaje
  }: {
    nombre: string;
    porcentaje: number;
  }) {
    this.nombre = nombre;
    this.porcentaje = porcentaje;
  }
}
