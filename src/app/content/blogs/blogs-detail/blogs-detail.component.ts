import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../common/constants';
import { BlogsService } from '../blogs.service';
import { GlobalFunctions } from '../../../common/global-function';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrl: './blogs-detail.component.scss'
})
export class BlogsDetailComponent implements OnInit {

  blogListSwiper: any = [];
  blogData: any = [];
  blogListPG: any = [];
  selblogCategory: any = "";
  pageNo: any;
  limit: any;
  first: number = 0;
  rows: number = 10;
  totalBlogData: any = 0;
  constants: any = CONSTANTS;
  blogUrlSlug: any;

  constructor(
    private _blogsService: BlogsService,
    private _globalFunctions: GlobalFunctions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _globalService: GlobalService,
  ) {
  }

  ngOnInit(): void {
    this.blogUrlSlug = this._activatedRoute.snapshot.paramMap.get('urlSlug');
    this.getBlogsListForSwiper();
    if (this.blogUrlSlug) {
      this.getBlogById();
    }


  }

  setCanonicalUrl(urlSlug: any = "", meta_title: any = "") {
    this._globalService.removeCanonicalUrl();
    let urlData = {
      url: `https://blogsmk.com/blogs/` + urlSlug,
      title: meta_title
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
        // result?.Data?.docs.map((i: any) => {
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

  getBlogById(): void {
    let filter = {
      url_slug: this.blogUrlSlug || ""
    };
    this._blogsService.getBlogById(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // const [day, month, year] = result?.Data?.blog_date.split('-').map(Number);
        // result.Data.blog_date = new Date(year, month - 1, day);
        this.blogData = result?.Data;

        //SEO Setup
        this.setCanonicalUrl(result?.Data?.url_slug, result?.Data?.meta_title);
        let metaTag: any = {
          title: result?.Data?.meta_title || "",
          description: result?.Data?.meta_description || "",
          robots :"index, follow",
        }
        this._globalService.setMetaTags(metaTag);
        let shopPageMetaOgTag: any = {};
        shopPageMetaOgTag["og:title"] = result?.Data?.og_title || "";
        shopPageMetaOgTag["og:description"] = result?.Data?.og_description || "";
        shopPageMetaOgTag["og:sitename"] = result?.Data?.og_sitename || "";
        shopPageMetaOgTag["og:type"] = result?.Data?.og_type || "";
        shopPageMetaOgTag["og:url"] = `https://blogsmk.com/blogs/` + result?.Data?.url_slug;
        this._globalService.setOpenGraphTags(shopPageMetaOgTag);

      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  redirectToBlogDTL(blog: any) {
    window.location.href = window.location.origin + "/blogs/" + blog?.url_slug
  }
}
