export class Sale {
  readonly idCliente: number;
  readonly fecha: string;

  constructor({
    idCliente,
    fecha,
  }: {
    idCliente: number;
    fecha: string;
  }) {
    this.idCliente = idCliente;
    this.fecha = fecha;
  }
}
