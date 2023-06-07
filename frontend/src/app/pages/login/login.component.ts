import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any;
  public token: any;
  public identity: any;
  public data_error: any;
  public email_userText:any;
  constructor(
    private _userService: UserService,
    private _router: Router
  ) { 
    this.identity = this._userService.getIdentity();
    this.user=new User('','','','','');
  }

  ngOnInit(): void {
    if (this.identity.nombre) {
      this._router.navigate(['tasks']);
    }
  }
  login(loginForm: any) {
    if (loginForm.valid) {
      this._userService.login(this.user).subscribe(
        (response) => {
          this.token = response.jwt;
          localStorage.setItem('token', this.token);
          this._userService.login(this.user, true).subscribe((response) => {
            localStorage.setItem('identity', JSON.stringify(response.user));
            this._router.navigate(['tasks']);
          });
        },
        (error) => {
          Swal.fire({
            title:'Error!' ,
            text:(this.data_error = error.error.message),
            icon:"error",
            footer:"<p>JJRZ<p>",
            padding: '3em',
            color: '#716add',
          });
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
  forgot_password(forgotPasswordForm : any){
    if(forgotPasswordForm.valid){
      this._userService.forgotPassword({
        email : forgotPasswordForm.value.email_user,
      }).subscribe(
        response => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Correo Enviado con exito!',
                footer: '<p>JJRZ</p>',
                showConfirmButton: false,
                timer: 1500
              })
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal!',
            text: (this.data_error = error.error.message),
            footer: '<p>JJRZ</p>'
          })
        }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario',
        footer: '<p>JJRZ</p>'
      })
    }
  }
}
