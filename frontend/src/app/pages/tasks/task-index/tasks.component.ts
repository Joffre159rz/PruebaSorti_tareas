import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
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
      this.consulta()
    }else{
      this._router.navigate(['']);
    }
  }
  consulta(){
    this._taskService.get_tasksByUser(this.identity.id).subscribe(
      response=>{
        this.tasks=response.task;
      }
      )
  }
  cambiarEstadoTask(id:any){
    this._taskService.get_tasksById(id).subscribe(
      response=>{
        console.log("soy la primera");
        console.log(response);
        if (response.task.estado=="completado") {
          this.asd={
            id:id,
            estado:"no completado"
          }
        }else{
          this.asd={
            id:id,
            estado:"completado"
          }
        }
        this.identity = this._userService.getIdentity()
        if (this.identity.nombre) {
          this._taskService.putState_task(this.asd).subscribe(
            response=>{
              this.consulta()
              console.log("estado actualizado revisar en la base de datos");
            })
        }else{
          this._router.navigate(['']);
        }
        
      })
    
  }
  desecharTask(id:any){
    this.identity = this._userService.getIdentity()
        if (this.identity.nombre) {
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success mx-3',
              cancelButton: 'btn btn-danger mx-3'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Seguro quieres desechar la Tarea?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, desechar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Desechada!',
                'La tarea fue desechada correctamente.',
                'success'
              )
              this.asd={
                id:id,
                estado:"desechado"
              }
                this._taskService.putState_task(this.asd).subscribe(
                  response => {
                    this._taskService.get_tasksByUser(this.identity.id).subscribe(
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

}
