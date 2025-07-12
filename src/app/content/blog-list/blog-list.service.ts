import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalFunctions } from '../../common/global-function';

@Injectable({
  providedIn: 'root'
})
export class BlogListService {

  constructor(private http: HttpClient, private _globalFunctions: GlobalFunctions) { }

  //Get All Products
  getBlogList(data: any): any {
    return this.http.post(environment.appURL + 'admin/blogs/list', data, this._globalFunctions.getAuthorizationHeader());
  }

  addEditBlog(data: any): any {
    return this.http.post(environment.appURL + 'admin/blogs/save', data, this._globalFunctions.getAuthorizationHeader());
  }

  removeBlogs(data: any): any {
    return this.http.post(environment.appURL + 'admin/blogs/remove', data, this._globalFunctions.getAuthorizationHeader());
  }

  getBlogById(data: any): any {
    return this.http.post(environment.appURL + 'admin/blogs/getone', data, this._globalFunctions.getAuthorizationHeader());
  }

  uploadBannerImage(fileObj: any): any {
    return this.http.post(environment.appURL + 'admin/blogs/upload', fileObj, this._globalFunctions.getFileAuthorizationHeader());
  }

  // getsymptoms(data: any): any {
  //   return this.http.post(environment.appURL + 'admin/symptoms', data, this._globalFunctions.getFileAuthorizationHeader());
  // }

  // getsymptomsList(): any {
  //   return this.http.get(environment.appURL + 'admin/symptoms', this._globalFunctions.getFileAuthorizationHeader());
  // }

  getAllBlogList(){
    return this.http.get(environment.appURL + 'admin/blogcategory', this._globalFunctions.getAuthorizationHeader());
  }
}
