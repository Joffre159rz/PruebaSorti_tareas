import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public token: any;
  public identity: any;
  constructor(
    private _userService: UserService, 
    private _router: Router
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('identity')
    localStorage.removeItem('token')

    this.identity=null;
    this.token=null;
    this._router.navigate([''])
  }

}
