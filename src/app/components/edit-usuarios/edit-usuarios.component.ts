import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.component.html',
  styleUrls: ['./edit-usuarios.component.scss']
})
export class EditUsuariosComponent implements OnInit {
  id: number = 0;
  email: string;
  rol: number;
  password: string;

  creado: boolean
  constructor(private readonly userService: UsersService, private readonly router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser(this.id).subscribe((response: any) => {
      this.email = response[0].email;
      this.rol = response[0].rol;
      this.password = "";
      //otrod
      this.creado = false
    })
  }
  onEdit() {
    this.userService.editUser(this.id, this.email, this.password, this.rol).subscribe((response) => {
      return response
    });
    this.creado = true
    setTimeout(() => {
      this.router.navigateByUrl('/dyg/usuarios')
    }, 750);
  }
}
