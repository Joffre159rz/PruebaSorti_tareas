import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trash-index',
  templateUrl: './trash-index.component.html',
  styleUrls: ['./trash-index.component.css']
})
export class TrashIndexComponent implements OnInit {
  public tasks: any;
  public p:any
  public identity: any;
  public asd:{} | undefined;
  constructor(
    private _userService: UserService,
    private _taskService: TaskService,
    private _router: Router
    ) { 
      this.identity = this._userService.getIdentity();
    }

  ngOnInit(): void {
    if (this.identity.nombre) {
      this._taskService.get_tasksTrashByUser(this.identity.id).subscribe(
        response=>{
          this.tasks=response.task;
        }
        )
    }else{
      this._router.navigate(['']);
    }
  }
  eliminarTask(id:any){
    this.identity = this._userService.getIdentity();
    if (this.identity.nombre) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success mx-3',
          cancelButton: 'btn btn-danger mx-3'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Seguro quieres Eliminar la Tarea?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'La tarea fue eliminada correctamente.',
            'success'
          )
          this._taskService.delete_task(id).subscribe(
            response => {
              this._taskService.get_tasksTrashByUser(this.identity.id).subscribe(
                response => {
                  this.tasks = response.task;
                },
                error => {
  
                }
              )
            },
            error => {
            }
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Se canceló la petición',
            'error'
          )
        }
      })
    }else{
      this._router.navigate(['']);
    }
    
  }
  recuperarTask(id:any){
    this.identity = this._userService.getIdentity();
    if (this.identity.nombre) {
      this.asd={
        id:id,
        estado:"no completado"
      }
      this._taskService.putState_task(this.asd).subscribe(
      response=>{
        this._taskService.get_tasksTrashByUser(this.identity.id).subscribe(
          response => {
            Swal.fire({
              position:"center",
              icon:"success",
              title:"Tarea recuperada con Exito",
              footer:"<p>JJRZ<p>",
              showConfirmButton:false,
              timer:1500,
            });
            this.tasks = response.task;
          })
      })
    }else{
      this._router.navigate(['']);
    }

  }
}
