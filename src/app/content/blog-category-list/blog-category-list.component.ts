import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../common/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalFunctions } from '../../common/global-function';
import { BlogsService } from '../blogs/blogs.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-blog-category-list',
  templateUrl: './blog-category-list.component.html',
  styleUrl: './blog-category-list.component.scss'
})
export class BlogCategoryListComponent implements OnInit {

  blogListPG: any = [];
  blogListSwiper: any = [];
  selblogCategory: any = "";
  constants: any = CONSTANTS;
  pageNo: any;
  limit: any;
  first: number = 0;
  rows: number = 10;
  totalBlogData: any = 0;
  blogCategoryName: any;

  constructor(
    private _blogsService: BlogsService,
    private _globalFunctions: GlobalFunctions,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _globalService: GlobalService,
  ) {
  }

  ngOnInit(): void {
    this.blogCategoryName = this._activatedRoute.snapshot.paramMap.get('categoryName');
    if (this.blogCategoryName) {
      this.getBlogsListPG();
    }
    this.getBlogsListForSwiper();
    //SEO Setup
    this.setCanonicalUrl(this.blogCategoryName || "");
    if (this.blogCategoryName == "Business") {
     this.setSEOData(this.blogCategoryName,"Business Blog, News, Articles, and more | Blogsmk","Browse through Business Blogs, News, Articles, Expert Opinions & more on the latestlews4u. Find the latest news and articles on Business.");
    }
    if (this.blogCategoryName == "Technology") {
      this.setSEOData(this.blogCategoryName,"Explore the Latest Technology News and Trends in One Hub | Blogsmk","Explore the latest technology news, trends, and updates all in one hub. Stay informed with cutting-edge innovations, reviews, and insights in the tech world!");
    }
    if (this.blogCategoryName == "Lifestyle") {
      this.setSEOData(this.blogCategoryName,"Stay Updated with Fashion, Beauty Tips, and Celebrity News | Blogsmk","Discover the latest fashion trends, expert beauty tips, and the hottest celebrity news all in one place. Stay stylish and informed with Blogsmk!");
    }
    if (this.blogCategoryName == "Sports") {
      this.setSEOData(this.blogCategoryName,"Stay Informed with Sports News, Blogs, and Articles | Blogsmk","Browse through Sports Blogs, News, Articles, Expert Opinions & more on the latestnews4u Blog. Find the latest news and articles on Sports.");
    }
    if (this.blogCategoryName == "News") {
      this.setSEOData(this.blogCategoryName,"Today's Latest World News, Updates, and Headlines | Blogsmk","Read Today's latest India News, and World News, and get updates on politics, auto, technology, mutual funds, and more on Blogsmk.");
    }
    if (this.blogCategoryName == "Fashion") {
      this.setSEOData(this.blogCategoryName,"Explore Delicious Recipes, Food Tips, and Culinary Trends | Blogsmk","Discover delicious recipes, chef tips, and diet trends. Explore local and international cuisines in the 'Food' section for the latest updates on Blogsmk!");
    }
    if (this.blogCategoryName == "Fitness") {
      this.setSEOData(this.blogCategoryName,"Stay Fit and Healthy with the Latest Fitness Trends | Blogsmk","Get the latest fitness tips, trends, and expert advice at Blogsmk. From workouts to nutrition, we help you stay fit and live healthier.");
    }

  }

  setSEOData(categoryName: any="",title:any="",desc:any="") {
    let metaTag: any = {
      title: title,
      description: desc,
      robots :"index, follow",
    }
    this._globalService.setMetaTags(metaTag);
    let shopPageMetaOgTag: any = {};
    shopPageMetaOgTag["og:title"] = title;
    shopPageMetaOgTag["og:description"] = desc;
    shopPageMetaOgTag["og:sitename"] = "blogsmk";
    shopPageMetaOgTag["og:type"] = "Website";
    shopPageMetaOgTag["og:url"] = `https://blogsmk.com/category-blogs/` + categoryName;
    this._globalService.setOpenGraphTags(shopPageMetaOgTag);
  }

  setCanonicalUrl(categoryName: any) {
    this._globalService.removeCanonicalUrl();
    let urlData = {
      url: `https://blogsmk.com/category-blogs/` + categoryName,
      title: ""
    };

    if (categoryName == "Business") {
      urlData.title = "Business Blog, News, Articles, and more | Blogsmk";
    }
    if (categoryName == "Technology") {
      urlData.title = "Explore the Latest Technology News and Trends in One Hub | Blogsmk";
    }
    if (categoryName == "Lifestyle") {
      urlData.title = "Stay Updated with Fashion, Beauty Tips, and Celebrity News | Blogsmk";
    }
    if (categoryName == "Sports") {
      urlData.title = "Stay Informed with Sports News, Blogs, and Articles | Blogsmk";
    }
    if (categoryName == "News") {
      urlData.title = "Today's Latest World News, Updates, and Headlines | Blogsmk";
    }
    if (categoryName == "Fashion") {
      urlData.title = "Explore Delicious Recipes, Food Tips, and Culinary Trends | Blogsmk";
    }
    if (categoryName == "Fitness") {
      urlData.title = "Stay Fit and Healthy with the Latest Fitness Trends | Blogsmk";
    }
    this._globalService.setCanonicalUrl(urlData);
  }

  getBlogsListPG(event: any = ''): void {
    this.pageNo = event ? (event.page + 1) : 1;
    this.limit = event.rows || 9;
    let filter = {
      page: this.pageNo || '1',
      limit: this.limit || '9',
      search: "",
      category: this.blogCategoryName || "",
      from:"blogsmk"
    };
    this._blogsService.getBlogListPG(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // result?.Data?.docs.map((i: any) => {
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

  redirectToBlogDTL(blog: any) {
    this._router.navigate(['/blogs/', blog?.url_slug]);
    this.getBlogsListPG();
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
}
