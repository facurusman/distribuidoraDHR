export class Client {
  readonly nombre: string;
  readonly telefono: string;
  readonly email: string;
  readonly zona: string;
  readonly direccion: string;
  readonly detalle: string;
  readonly lista: number;

  constructor({
    nombre,
    telefono,
    email,
    zona,
    direccion,
    detalle,
    lista
  }: {
    nombre: string;
    telefono: string;
    email: string;
    zona: string;
    direccion: string;
    detalle: string;
    lista: number;
  }) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.zona = zona;
    this.direccion = direccion;
    this.detalle = detalle;
    this.lista = lista
  }
}
