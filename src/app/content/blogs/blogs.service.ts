import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalFunctions } from '../../common/global-function';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient, private _globalFunctions: GlobalFunctions) { }

  getBlogListPG(data: any): any {
    return this.http.post(environment.appURL + 'landing/blogs/list', data, this._globalFunctions.getAuthorizationHeader());
  }

  getBlogListWTPG(data: any): any {
    return this.http.post(environment.appURL + 'landing/blogs', data, this._globalFunctions.getAuthorizationHeader());
  }

  getBlogById(data: any): any {
    return this.http.post(environment.appURL + 'landing/blogs/getone', data, this._globalFunctions.getAuthorizationHeader());
  }

  getAllRoute(data:any){
    return this.http.post(environment.appURL + 'landing/sitemap',data , this._globalFunctions.getHeader());
  }
}
