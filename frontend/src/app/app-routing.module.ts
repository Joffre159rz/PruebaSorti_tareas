import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TasksComponent } from './pages/tasks/task-index/tasks.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskCreateComponent } from './pages/tasks/task-create/task-create.component';
import { TaskEditComponent } from './pages/tasks/task-edit/task-edit.component';
import { TrashIndexComponent } from './pages/trash/trash-index/trash-index.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:"tasks",component:TasksComponent},
  {path:"register",component:RegisterComponent},
  {path:"trash",component:TrashIndexComponent},


  {path:"tasks/registrar",component:TaskCreateComponent},
  {path:"tasks/editar/:id",component:TaskEditComponent},
  {path:'**',component:NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
