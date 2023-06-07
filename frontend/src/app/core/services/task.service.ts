import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public url:any;
  constructor(
    private _http:HttpClient,
  ) { 
    this.url=environment.apiUrl;
  }
  delete_task(id:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'task/delete/'+id,{headers:headers})
  }
  put_task(data:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'task/update/'+data.id,data,{headers:headers})
  }
  putState_task(data:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'task/update_state/'+data.id,data,{headers:headers})
  }
  post_task(data:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'task/create',data,{headers:headers})
  }
  get_tasksByUser(id:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'task/'+id,{headers:headers})
  }
  get_tasksTrashByUser(id:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'task/trash/'+id,{headers:headers})
  }

  get_tasksById(id:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'task/findTasksById/'+id,{headers:headers})
  }
}
