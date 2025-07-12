import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss'
})
export class DisclaimerComponent {

   constructor( private _globalService: GlobalService,){}

    ngOnInit(): void {
       //SEO Setup
       this.setCanonicalUrl();
       let metaTag: any = {
         title: "Disclaimer - Blogsmk",
         description: "Read the disclaimer for Blogsmk. We provide accurate news but are not responsible for external content, errors, or omissions in our articles.",
         robots :"index, follow",
       }
       this._globalService.setMetaTags(metaTag);
       let shopPageMetaOgTag: any = {};
       shopPageMetaOgTag["og:title"] = "Disclaimer - Blogsmk";
       shopPageMetaOgTag["og:description"] = "Read the disclaimer for Blogsmk. We provide accurate news but are not responsible for external content, errors, or omissions in our articles.";
       shopPageMetaOgTag["og:sitename"] = "blogsmk";
       shopPageMetaOgTag["og:type"] = "Website";
       shopPageMetaOgTag["og:url"] = `https://blogsmk.com/disclaimer`;
       this._globalService.setOpenGraphTags(shopPageMetaOgTag);
    }

    setCanonicalUrl() {
      this._globalService.removeCanonicalUrl();
      let urlData = {
        url: `https://blogsmk.com/disclaimer`,
        title: "Disclaimer - Blogsmk"
      };
      this._globalService.setCanonicalUrl(urlData);
    }
}
