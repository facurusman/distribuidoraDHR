export class Sale {
  readonly idCliente: number;
  readonly fecha: Date;
  readonly total: string;

  constructor({
    idCliente,
    fecha,
    total
  }: {
    idCliente: number;
    fecha: Date;
    total: string
  }) {
    this.idCliente = idCliente;
    this.fecha = fecha;
    this.total = total
  }
}
