export class Sale {
  readonly idCliente: number;
  readonly fecha: Date;
  readonly total: number;
  readonly deuda: number;

  constructor({
    idCliente,
    fecha,
    total,
    deuda
  }: {
    idCliente: number;
    fecha: Date;
    total: number;
    deuda: number;
  }) {
    this.idCliente = idCliente;
    this.fecha = fecha;
    this.total = total;
    this.deuda = deuda;
  }
}
