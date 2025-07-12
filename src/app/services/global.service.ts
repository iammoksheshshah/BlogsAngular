import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";

function _window() : any {
    // return the global native browser window object
    if(typeof window != undefined){
      return window;
    }
}

@Injectable({
  providedIn:'root'
})

export class GlobalService {

  public canonicalElement: HTMLLinkElement | null = null;
  
  constructor(
    private meta: Meta
  ){
  }

  setMetaTags(metaTags: { [key: string]: string }) {
    for (const [name, content] of Object.entries(metaTags)) {
      this.meta.updateTag({ name, content });
    }
  }

  setOpenGraphTags(ogTags: { [key: string]: string }) {
    for (const [property, content] of Object.entries(ogTags)) {
      this.meta.updateTag({ property, content });
    }
  }
  
  setTwitterCardTags(twitterTags: { [key: string]: string }) {
    for (const [name, content] of Object.entries(twitterTags)) {
      this.meta.updateTag({ name, content });
    }
  }

  setJsonLdData(jsonLdData: any,id:any) {

    if (id == "bc") {
      // Remove existing JSON-LD script if present
    this.removeJsonLdDataForbreadcrum();

    // Create a new JSON-LD script element
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = id;
    jsonLdScript.text = JSON.stringify(jsonLdData);

     // Append the JSON-LD script element to the head of the document
     document.head.appendChild(jsonLdScript);
    }
    if (id == "websch") {
      // Remove existing JSON-LD script if present
    this.removeJsonLdDataForWebSchema();

    // Create a new JSON-LD script element
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = id;
    jsonLdScript.text = JSON.stringify(jsonLdData);

     // Append the JSON-LD script element to the head of the document
     document.head.appendChild(jsonLdScript);
    }
    if (id == "lbSchema") {
      // Remove existing JSON-LD script if present
    this.removeJsonLdDataForLBSchema();

    // Create a new JSON-LD script element
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = id;
    jsonLdScript.text = JSON.stringify(jsonLdData);

     // Append the JSON-LD script element to the head of the document
     document.head.appendChild(jsonLdScript);
    }
    if (id == "orgSchema") {
      // Remove existing JSON-LD script if present
    this.removeJsonDataForOrgSchema();

    // Create a new JSON-LD script element
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = id;
    jsonLdScript.text = JSON.stringify(jsonLdData);

     // Append the JSON-LD script element to the head of the document
     document.head.appendChild(jsonLdScript);
    }
    
   
  }

  removeJsonLdDataForbreadcrum() {
    // Remove all JSON-LD script elements from the head
    // const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const scripts = document.querySelectorAll('#bc');
    scripts.forEach(script => document.head.removeChild(script));
  }

  removeJsonLdDataForWebSchema() {
    // Remove all JSON-LD script elements from the head
    // const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const scripts = document.querySelectorAll('#websch');
    scripts.forEach(script => document.head.removeChild(script));
  }

  removeJsonLdDataForLBSchema() {
    // Remove all JSON-LD script elements from the head
    // const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const scripts = document.querySelectorAll('#lbSchema');
    scripts.forEach(script => document.head.removeChild(script));
  }

  removeJsonDataForOrgSchema() {
    // Remove all JSON-LD script elements from the head
    // const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const scripts = document.querySelectorAll('#orgSchema');
    scripts.forEach(script => document.head.removeChild(script));
  }
  
  setCanonicalUrl(urlData: any) {
    // Remove existing canonical link if present
    this.removeCanonicalUrl();

    // Create a new canonical link element
    this.canonicalElement = document.createElement('link');
    this.canonicalElement.rel = 'canonical';
    this.canonicalElement.href = urlData.url;
    
    // Append the canonical link element to the head of the document
    document.head.appendChild(this.canonicalElement);
    document.getElementsByTagName('title')[0].innerText = `${urlData.title}`;
  }

  removeCanonicalUrl() {
    if (this.canonicalElement) {
      document.head.removeChild(this.canonicalElement);
      this.canonicalElement = null;
    }
  }

  get nativeWindow() : any {
    return _window();
  }
}