import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url:any;
  public user:any;
  public token:any;
  public identity:any;
  constructor(
    private _http:HttpClient,
  ) { 
    this.url=environment.apiUrl;
    this.user=new User('','','','','');
  }
  login(usuario:any,getToken=false):Observable<any>{
    const json=usuario;
    if (getToken!=false) {
      usuario.getToken=true
    }
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'user/login',json,{headers:headers})
  }
  getToken():Observable<any>{
    const token=localStorage.getItem('token');
    if (token) {
      this.token=token
    }else{
      this.token=null;
    }
    return this.token;
  }
  getIdentity():Observable<any>{
    const identity=JSON.parse(localStorage.getItem('identity')||'[]');
    if (identity) {
      this.identity=identity
    }else{
      this.identity=null;
    }
    return this.identity;
  }
  post_user(data:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'user/signup',data,{headers:headers})
  }
  put_user(data:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'user/update/'+data.id,data,{headers:headers})
  }
  forgotPassword(data : any){
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'user/forgotpassword/', data ,{headers:headers})
  }
}


