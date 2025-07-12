import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { GlobalFunctions } from '../../common/global-function';
import { BlogListService } from './blog-list.service';
import { CommonModalComponent } from '../../common-modal/common-modal.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  isTableLoading: boolean = false;
  totalStoryData: any;
  searchStory: any = "";
  first: number = 0;
  rows: number = 10;
  STORY_DATA: any = [];
  aboutStory: boolean = false;
  pageNo: any;
  limit: any;

  constructor(
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    private _toastr: ToastrService,
    private _blogService: BlogListService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getBlog();
  }

  onKeySearch(event: any) { // without type info
    this.searchStory = event.target.value;
    this.getBlog();
  }

  getBlog(event: any = ''): void {
    this.isTableLoading = true;
    this.pageNo = event? (event.page + 1) : 1;
    this.limit = event.rows || 10;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '10',
      search: this.searchStory,
      from:"blogsmk"
    };
    this._blogService.getBlogList(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        result.Data.docs.map((item:any)=>{
          item.aboutStoryDesc=false;
        })
        this.totalStoryData = result.Data.totalDocs;
        this.STORY_DATA = result.Data.docs;

        this.isTableLoading = false;
      } else {
        this.isTableLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this.isTableLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  // changeStatusAction(e: any, resData: any) {
  //  // e.stopPropagation();
  //   this.isTableLoading = true;
  //   const dialogRef = this.dialog.open(CommonModalComponent, {
  //     width: '600px',
  //     data: {
  //       title: "Confirmation",
  //       message: "Are you sure you want to change the Status?",
  //       buttonNames: [{ firstBtn: "Update", secondBtn: "Cancel" }]
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe((res) => {
  //     if (res) {
  //       let param = {
  //         blogid: resData.id,
  //         status: e
  //       }

  //       this._blogService.changeStatusStory(param).subscribe((result: any) => {
  //         if (result && result.IsSuccess) {
  //           this._toastr.clear();
  //           this._toastr.success("Status Updated successfully.", "Success");
  //           this.getBlog();
  //           this.isTableLoading = false;
  //         } else {
  //           this.getBlog();
  //           this.isTableLoading = false;
  //           this._globalFunctions.successErrorHandling(result, this, true);
  //         }
  //       }, (error: any) => {
  //         this.getBlog();
  //         this.isTableLoading = false;
  //         this._globalFunctions.errorHanding(error, this, true);
  //       });
  //     } else {
  //       this.getBlog();
  //       this.isTableLoading = false;
  //     }
  //   });
  // }

  removeBlog(e:any, element:any){
    e.stopPropagation();
    this.isTableLoading = true;
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {
        title: "Confirmation",
        message: "Are you sure you want to Remove this Record?",
        buttonNames: [{ firstBtn: "Delete", secondBtn: "Cancel" }]
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let param = {
          blogid: element,
          status: e
        }

        this._blogService.removeBlogs(param).subscribe((result: any) => {
          if (result && result.IsSuccess) {
            this._toastr.clear();
            this._toastr.success("Data Remove successfully.", "Success");
            this.getBlog();
            this.isTableLoading = false;
          } else {
            this.getBlog();
            this.isTableLoading = false;
            this._globalFunctions.successErrorHandling(result, this, true);
          }
        }, (error: any) => {
          this.getBlog();
          this.isTableLoading = false;
          this._globalFunctions.errorHanding(error, this, true);
        });
      } else {
        this.getBlog();
        this.isTableLoading = false;
      }
    });
  }


  addBlog(){
    this._router.navigate(['blog-list/', 'blogDetails']);
  }

  editBlog(e: any, id: any) {
    e.stopPropagation();
    this._router.navigate(['blog-list/', id]);
  }

}
