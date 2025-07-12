import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit{

  constructor(
    private _globalService: GlobalService,
  ){}

  ngOnInit(): void {
     //SEO Setup
     this.setCanonicalUrl();
     let metaTag: any = {
       title: "Privacy Policy | Blogsmk",
       description: "Read the Privacy Policy of Blogsmk. Learn how we protect your data, ensure your privacy, and manage your information for a safe and secure browsing experience.",
       robots :"index, follow",
     }
     this._globalService.setMetaTags(metaTag);
     let shopPageMetaOgTag: any = {};
     shopPageMetaOgTag["og:title"] = "Privacy Policy | Blogsmk";
     shopPageMetaOgTag["og:description"] = "Read the Privacy Policy of Blogsmk. Learn how we protect your data, ensure your privacy, and manage your information for a safe and secure browsing experience.";
     shopPageMetaOgTag["og:sitename"] = "blogsmk";
     shopPageMetaOgTag["og:type"] = "Website";
     shopPageMetaOgTag["og:url"] = `https://blogsmk.com/privacy-policy`;
     this._globalService.setOpenGraphTags(shopPageMetaOgTag);
  }

  setCanonicalUrl() {
    this._globalService.removeCanonicalUrl();
    let urlData = {
      url: `https://blogsmk.com/privacy-policy`,
      title: "Privacy Policy | Blogsmk",
      description: "Read the Privacy Policy of Blogsmk. Learn how we protect your data, ensure your privacy, and manage your information for a safe and secure browsing experience."
    };
    this._globalService.setCanonicalUrl(urlData);
  }
}
