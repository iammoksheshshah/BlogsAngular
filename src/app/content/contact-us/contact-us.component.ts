import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {

  constructor( private _globalService: GlobalService,){}

  ngOnInit(): void {
     //SEO Setup
     this.setCanonicalUrl();
     let metaTag: any = {
       title: "Contact Us - Blogsmk",
       description: "Get in touch with Blogsmk for inquiries, feedback, or partnerships. We value your input and strive to provide the best news experience.",
       robots :"index, follow",
     }
     this._globalService.setMetaTags(metaTag);
     let shopPageMetaOgTag: any = {};
     shopPageMetaOgTag["og:title"] = "Contact Us - Blogsmk";
     shopPageMetaOgTag["og:description"] = "Get in touch with Blogsmk for inquiries, feedback, or partnerships. We value your input and strive to provide the best news experience.";
     shopPageMetaOgTag["og:sitename"] = "blogsmk";
     shopPageMetaOgTag["og:type"] = "Website";
     shopPageMetaOgTag["og:url"] = `https://blogsmk.com/contact-us`;
     this._globalService.setOpenGraphTags(shopPageMetaOgTag);
  }

  setCanonicalUrl() {
    this._globalService.removeCanonicalUrl();
    let urlData = {
      url: `https://blogsmk.com/contact-us`,
      title: "Contact Us - Blogsmk"
    };
    this._globalService.setCanonicalUrl(urlData);
  }
}
