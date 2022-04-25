export class User {
  readonly email: string;
  readonly password: string;
  readonly rol: number;

  constructor({ email, password, rol }: { email: string; password: string, rol:number }) {
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}
