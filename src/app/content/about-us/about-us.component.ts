import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
constructor( private _globalService: GlobalService,){}

    ngOnInit(): void {
       //SEO Setup
       this.setCanonicalUrl();
       let metaTag: any = {
         title: "About Us - Blogsmk",
         description: "Stay updated with the latest news and trends from around the world. Blogsmk delivers breaking stories, insightful analysis, and expert opinions daily.",
         robots :"index, follow",
       }
       this._globalService.setMetaTags(metaTag);
       let shopPageMetaOgTag: any = {};
       shopPageMetaOgTag["og:title"] = "About Us - Blogsmk";
       shopPageMetaOgTag["og:description"] = "Stay updated with the latest news and trends from around the world. Blogsmk delivers breaking stories, insightful analysis, and expert opinions daily.";
       shopPageMetaOgTag["og:sitename"] = "blogsmk";
       shopPageMetaOgTag["og:type"] = "Website";
       shopPageMetaOgTag["og:url"] = `https://blogsmk.com/about-us`;
       shopPageMetaOgTag["og:url"] = `https://blogsmk.com/about-us`;
       shopPageMetaOgTag["og:url"] = `https://blogsmk.com/about-us`;
       this._globalService.setOpenGraphTags(shopPageMetaOgTag);
    }

    setCanonicalUrl() {
      this._globalService.removeCanonicalUrl();
      let urlData = {
        url: `https://blogsmk.com/about-us`,
        title: "About Us - Blogsmk"
      };
      this._globalService.setCanonicalUrl(urlData);
    }
}
