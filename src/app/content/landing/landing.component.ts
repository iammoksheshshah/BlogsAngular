import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs/blogs.service';
import { GlobalFunctions } from '../../common/global-function';
import { CONSTANTS } from '../../common/constants';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
declare var Swiper: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  blogListSwiper: any = [];
  blogListSideBar: any = [];
  blogListNews: any = [];
  blogListWTPG: any = [];
  blogListPG: any = [];
  blogListPGForCat:any = [];
  totalBlogDataForCat:any = 0;
  selblogCategory:any="";
  pageNo: any;
  limit: any;
  pageNoForCat: any;
  limitForCat: any;
  first: number = 0;
  rows: number = 10;
  totalBlogData:any=0;
  constants: any = CONSTANTS;


  constructor(
    private _blogsService: BlogsService,
    private _globalFunctions: GlobalFunctions,
    private _router: Router,
     private _globalService: GlobalService,
  ) {
  }

  ngOnInit(): void {
    this._router.events.subscribe((evt:any) => {
      window.scrollTo(0, 0)
    });
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    //SEO Setup
    this.setCanonicalUrl();
    let metaTag: any = {
      title: "Explore the Latest in Business, Sports, Tech, Food & More | Blogsmk",
      description: "Find the latest technology news, updates, and trends in one place at Blogsmk. Stay informed with the newest innovations and tech insights all in one hub!",
      robots :"index, follow",
    }
    this._globalService.setMetaTags(metaTag);
    let shopPageMetaOgTag: any = {};
    shopPageMetaOgTag["og:title"] = "Explore the Latest in Business, Sports, Tech, Food & More | Blogsmk";
    shopPageMetaOgTag["og:description"] = "Find the latest technology news, updates, and trends in one place at Blogsmk. Stay informed with the newest innovations and tech insights all in one hub!";
    shopPageMetaOgTag["og:sitename"] = "blogsmk";
    shopPageMetaOgTag["og:type"] = "Website";
    shopPageMetaOgTag["og:url"] = `https://blogsmk.com/`;
    this._globalService.setOpenGraphTags(shopPageMetaOgTag);

    this.getBlogsListForSwiper();
    this.getBlogsListWTPG();
    this.getBlogsListPG();
    this.getBlogsListForSideBar();
    this.getBlogsListForNews();
  }

  setCanonicalUrl() {
    this._globalService.removeCanonicalUrl();
    let urlData = {
      url: `https://blogsmk.com/`,
      title: "Explore the Latest in Business, Sports, Tech, Food & More | Blogsmk"
    };
    this._globalService.setCanonicalUrl(urlData);
  }

  getBlogsListForSwiper(): void {
    let filter = {
      page: 1,
      limit: 6,
      search: "",
      category: "",
      from:"blogsmk"
    };
    this._blogsService.getBlogListPG(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // result?.Data?.docs.map((i:any)=>{
        //   const [day, month, year] = i?.blog_date.split('-').map(Number);
        //   i.blog_date = new Date(year, month - 1, day);
        // })
        this.blogListSwiper = result?.Data?.docs;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  getBlogsListForSideBar(): void {
    let filter = {
      page: 1,
      limit: 2,
      search: "",
      category: "",
      from:"blogsmk"
    };
    this._blogsService.getBlogListPG(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {

        // result?.Data?.docs.map((i:any)=>{
        //   const [day, month, year] = i?.blog_date.split('-').map(Number);
        //   i.blog_date = new Date(year, month - 1, day);
        // })
        this.blogListSideBar = result?.Data?.docs;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  // getBlogsListForNews(): void {
  //   let filter = {
  //     page: 1,
  //     limit: 5,
  //     search: "",
  //     category: ""
  //   };
  //   this._blogsService.getBlogListPG(filter).subscribe((result: any) => {
  //     if (result && result.IsSuccess) {
  //       result?.Data?.docs.map((i:any) => {
  //         if(i.category == "News"){
  //           this.blogListNews = i;
  //         }
  //       })

  //     } else {
  //       this._globalFunctions.successErrorHandling(result, this, true);
  //     }
  //   }, (error: any) => {
  //     this._globalFunctions.errorHanding(error, this, true);
  //   });
  // }

  getBlogsListWTPG(event: any = ''): void {
    this.pageNoForCat = event? (event.page + 1) : 1;
    this.limitForCat = event.rows || 10;
    let filter = {
      page: this.pageNoForCat || '1',
      limit: this.limitForCat || '10',
      search: "",
      category: this.selblogCategory || "",
      from:"blogsmk"
    };
    this._blogsService.getBlogListPG(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // result?.Data?.docs.map((i:any)=>{
        //   const [day, month, year] = i?.blog_date.split('-').map(Number);
        //   i.blog_date = new Date(year, month - 1, day);
        // })
        this.blogListPGForCat = result?.Data?.docs;
        this.totalBlogDataForCat = result.Data.totalDocs;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }
  getBlogsListForNews(): void {
    let filter = {
      search: "",
      category: this.selblogCategory || "",
      from:"blogsmk"
    };
    this._blogsService.getBlogListWTPG(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // result?.Data?.map((i:any)=>{
        //   const [day, month, year] = i?.blog_date.split('-').map(Number);
        //   i.blog_date = new Date(year, month - 1, day);
        // })
        this.blogListNews = result?.Data.filter((i: any) => i.category === "News").slice(0, 5);
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  getBlogsListPG(event: any = ''): void {
    this.pageNo = event? (event.page + 1) : 1;
    this.limit = event.rows || 9;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '9',
      search: "",
      category: this.selblogCategory || "",
      from:"blogsmk"
    };
    this._blogsService.getBlogListPG(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // result?.Data?.docs.map((i:any)=>{
        //   const [day, month, year] = i?.blog_date.split('-').map(Number);
        //   i.blog_date = new Date(year, month - 1, day);
        // })
        this.blogListPG = result?.Data?.docs;
        this.totalBlogData = result.Data.totalDocs;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  redirectToBlogDTL(blog:any){
    this._router.navigate(['/blogs/',blog?.url_slug]);
  }
}
