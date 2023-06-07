import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user;
  public identity: any;
  constructor(
    private _userService: UserService,
    private _router: Router
  ) { 
    this.user=new User("","","","","");
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity.nombre) {
      this._router.navigate(['tasks']);
    }
  }
  register(taskregisterFormForm:any){
    if (taskregisterFormForm.valid) {
      this._userService.post_user({
        nombre: taskregisterFormForm.value.nombre,
        telefono: taskregisterFormForm.value.telefono,
        email: taskregisterFormForm.value.email,
        password: taskregisterFormForm.value.password,
      }).subscribe(
        (response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado con correctamente!',
            footer: '<p>JJRZ</p>',
            showConfirmButton: false,
            timer: 1500
          })
          this.user=new User("","","","","");
          this._router.navigate([''])
        },
        (error) => {
          
          console.log(error);
          
        }
      );
    } else {
      Swal.fire({
        title: 'Ooops!',
        icon:"error",
        text: 'Debes rellenar todos los campos',
        footer:"<p>JJRZ<p>",
      });
    }
  }
}
