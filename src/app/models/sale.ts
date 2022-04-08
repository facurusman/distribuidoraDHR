export class Sale {
  readonly idCliente: number;
  readonly fecha: Date;
  readonly total: number;

  constructor({
    idCliente,
    fecha,
    total
  }: {
    idCliente: number;
    fecha: Date;
    total: number
  }) {
    this.idCliente = idCliente;
    this.fecha = fecha;
    this.total = total
  }
}
