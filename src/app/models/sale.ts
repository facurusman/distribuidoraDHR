export class Sale {
  readonly idCliente: number;
  readonly fecha: string;
  readonly total: string;

  constructor({
    idCliente,
    fecha,
    total
  }: {
    idCliente: number;
      fecha: string;
    total : string
  }) {
    this.idCliente = idCliente;
    this.fecha = fecha;
    this.total = total
  }
}
