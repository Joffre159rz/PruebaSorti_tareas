import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  public task;
  public usuarios : any;
  public clientes : any;
  public identity : any;

  constructor(

    private _taskService : TaskService,
    private _userService : UserService,
    private router : Router,

  ) {
    this.task = new task('', '', '', '',1);
    this.identity = this._userService.getIdentity();
   }
  ngOnInit(): void {
    if (this.identity.nombre) {

    }else{
      this.router.navigate(['']);
    }
  }

  onSubmit(taskForm:any){
    this.identity = this._userService.getIdentity();
    if (this.identity.nombre) {
      if(taskForm.valid){

        this._taskService.post_task({
          titulo: taskForm.value.titulo,
          descripcion: taskForm.value.descripcion,
          estado:"no completado",
          UserId: this.identity.id,
        }).subscribe(
          response => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Tarea creada correctamente!',
              footer: '<p>JJRZ</p>',
              showConfirmButton: false,
              timer: 1500
            })
            this.task = new task('', '', '', '',1)
            this.router.navigate(['tasks'])
          },
          error => {
  
          }
        )
  
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Algo salió mal!',
          text: 'Rellena todos los campos del formulario!',
          footer: '<p>JJRZ</p>'
        })
      }
    }else{
      this.router.navigate(['']);
    }
    
  }
}
