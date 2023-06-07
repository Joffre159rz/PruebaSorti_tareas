import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  public task:any;
  public id : any;
  public url;
  public identity : any;
  public titulo:any;
  constructor(
    private _route : ActivatedRoute,
    private _taskService : TaskService,
    private _userService : UserService,
    private route : Router,
  ) { 

    this.url = environment.apiUrl;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity.nombre) {
      this._route.params.subscribe(
        params=>{
          this.id=params['id'];
          this._taskService.get_tasksById(this.id).subscribe(
            response=>{
              this.task=response.task
            }
          )
        }
      )
    }else{
      this.route.navigate(['']);
    }
  }

  onSubmit(taskForm:any){
    this.identity = this._userService.getIdentity();
    if (this.identity.nombre) {
      if(taskForm.valid){
        this._taskService.put_task({
          id:this.id,
          titulo: taskForm.value.titulo,
          descripcion: taskForm.value.descripcion,
        }).subscribe(
          response => {
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Tarea actualizada correctamente!',
              footer: '<p>JJRZ</p>',
              showConfirmButton: false,
              timer: 1500
            })
            this.route.navigate(['tasks'])
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
      this.route.navigate(['']);
    }
    
  }

}
