import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalFunctions } from '../common/global-function';
import { BlogsService } from './blogs/blogs.service';
import { CONSTANTS } from '../common/constants';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit,DoCheck{

  isLogOutView:boolean = false;
  constants:any = CONSTANTS;
  constructor(
    private router: Router,
    private toastr:ToastrService,
    private _globalFunctions:GlobalFunctions,
    private _blogService:BlogsService
  ){}

  ngOnInit(): void {
    if(localStorage.getItem('accessToken')){
      this.isLogOutView =true;
    }
    this.setAllRotueApi();
  }

 
  setAllRotueApi(){
    const sitrmapRoute = {
      categories : this.constants.categoryList || []
    }
    this._blogService.getAllRoute(sitrmapRoute).subscribe((result:any)=>{
      if(result && result.IsSuccess){
      } else {
        this._globalFunctions.successErrorHandling(result.Message,this,true);
      }
    },(error:any)=>{
      this._globalFunctions.errorHanding(error,this,true);
    })
  }

  ngDoCheck(): void {
    if(localStorage.getItem('accessToken')){
      this.isLogOutView =true;
    }
  }

  blogCategotyList(categoryName:any){
    window.location.href = window.location.origin + "/category-blogs/" + categoryName
  } 

  logout(): void {
    this.isLogOutView =false;
    localStorage.removeItem('accessToken');
    localStorage.clear();
    this.router.navigate(['']);
    this.toastr.success('Logged Out Successfully!', 'Success');
  }
}
