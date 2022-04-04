export class Client {
  readonly nombre: string;
  readonly telefono: string;
  readonly email: string;
  readonly zona: string;
  readonly direccion: string;
  readonly detalle: string;

  constructor({
    nombre,
    telefono,
    email,
    zona,
    direccion,
    detalle,
  }: {
    nombre: string;
    telefono: string;
    email: string;
    zona: string;
    direccion: string;
    detalle: string;
  }) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
    this.zona = zona;
    this.direccion = direccion;
    this.detalle = detalle;
  }
}
