import { Component, OnInit, ViewChild } from '@angular/core';
import { CONSTANTS } from '../../../common/constants';
import { ToastrService } from 'ngx-toastr';
import { GlobalFunctions } from '../../../common/global-function';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogListService } from '../blog-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import moment from 'moment';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrl: './add-edit-blog.component.scss'
})
export class AddEditBlogComponent implements OnInit {

  blogForm: any = FormGroup;
  constants: any = CONSTANTS;
  blogDetails: any;
  selectedBannerImg: any;
  selectedOtherBlogImg: any;
  isBtnLoading: boolean = false;
  hasError: boolean = false;
  blogId: any;
  isText: boolean = true;
  editor !: Editor;
  other_editor: Editor[] = [];
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['undo', 'redo'],
  ];
  othertoolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['undo', 'redo'],
  ];
  other_description_length: any[] = [];
  brief_length: any = 0;

  constructor(
    private _toastr: ToastrService,
    private _globalFunctions: GlobalFunctions,
    private fb: FormBuilder,
    private _blogListService: BlogListService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    // this.other_editor = new Editor();
    this.other_editor = [];
    this.other_editor.push(new Editor());
    this.blogId = this._activatedRoute.snapshot.paramMap.get('id');
    this.init();
    if (this.blogId && this.blogId != "blogDetails") {
      this.getBlogById();
    }
  }

  init(tempObj: any = {}) {
    this.blogForm = this.fb.group({
      banner_image: ['', Validators.required],
      banner_alttext: ['', Validators.required],
      category: ['', Validators.required],
      title: ['', Validators.required],
      blog_date: ['', Validators.required],
      brief: ['', Validators.required],
      meta_title: ['', Validators.required],
      url_slug: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+$')]],
      canonical: ['', Validators.required],
      og_title: ['', Validators.required],
      og_description: ['', Validators.required],
      og_url: ['', Validators.required],
      og_type: ['', Validators.required],
      og_sitename: ['', Validators.required],
      meta_description: ['', Validators.required],

      blog_details: this.fb.array([this.createblogDetails()]),
    });
    this.blogDetails = this.blogForm.get('blog_details') as FormArray;
  }

  createblogDetails(tempObj: any = {}) {
    this.other_editor.push(new Editor());
    return this.fb.group({
      path: [''],
      description: [''],
      alttext: [''],
    })
  }

  get blogDetailsFormGroup() {
    return this.blogForm.get('blog_details') as FormArray;
  }

  addBlogDetails() {
    this.blogForm.get('blog_details').controls.forEach((element: any, index: any) => {
      if (this.blogForm.get('blog_details').invalid) {
        Object.keys(element.controls).forEach((key) => {
          this.blogForm.get('blog_details').controls[index].controls[key].touched = true;
          this.blogForm.get('blog_details').controls[index].controls[key].markAsDirty();
        });
        return;
      }
    });
    if (this.blogDetails.value.length && this.blogForm.get('blog_details').valid) {
      this.blogDetails.push(this.createblogDetails());
    } else {
      this._toastr.clear();
      this._toastr.error("You can not add more other list", 'Oops!');
    }
  }

  uploadItemImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file == "image") {
        if (!this.constants.imagearray.includes(file.type)) {
          this._toastr.clear();
          this._toastr.error(
            'File type is not allowed.',
            'Error'
          );
          return;
        }
      }
      const fileObj: any = new FormData();
      fileObj.append('file', file);
      this._blogListService.uploadBannerImage(fileObj).subscribe((result: any) => {
        if (result && result.IsSuccess) {
          this.selectedBannerImg = result.Data.imagePath;
          const itemImageFormControl = this.blogForm.get('banner_image');
          itemImageFormControl.setValue(result.Data.imagePath);
          this._toastr.clear();
          this._toastr.success(result.Message, 'Success');
        } else {
          this._globalFunctions.successErrorHandling(result, this, true);
        }
      }, (error: any) => {
        this._globalFunctions.errorHanding(error, this, true);
      })
    }
  }

  uploadOtherBlogImage(event: any, index: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file == "image") {
        if (!this.constants.imagearray.includes(file.type)) {
          this._toastr.clear();
          this._toastr.error(
            'File type is not allowed.',
            'Error'
          );
          return;
        }
      }
      const fileObj: any = new FormData();
      fileObj.append('file', file);
      this._blogListService.uploadBannerImage(fileObj).subscribe((result: any) => {
        if (result && result.IsSuccess) {
          let itemImageFormControl = this.blogForm.get('blog_details').controls[index].get('path');
          itemImageFormControl.setValue(result.Data.imagePath);
          this._toastr.clear();
          this._toastr.success(result.Message, 'Success');
        } else {
          this._globalFunctions.successErrorHandling(result, this, true);
        }
      }, (error: any) => {
        this._globalFunctions.errorHanding(error, this, true);
      })
    }
  }

  removeItemAvatar() {
    const itemImageFormControl = this.blogForm.get('banner_image');
    itemImageFormControl.setValue(null);
    this.selectedBannerImg = null;
  }

  removeOtherBlogAvatar(index: any) {
    const itemImageFormControl = this.blogForm.get('blog_details').controls[index].get('path');
    itemImageFormControl.setValue(null);
  }

  imageOnError(event: any) {
    // event.target.src = this.constants.defaultImage;
  }


  getBlogById() {
    let param = {
      blogid: this.blogId || ""
    }
    this._blogListService.getBlogById(param).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.selectedBannerImg = result.Data.banner_image;
        this.blogForm.get('banner_image').setValue(result.Data.banner_image);
        this.blogForm.get('banner_alttext').setValue(result.Data.banner_alttext);
        this.blogForm.get('blog_date').setValue(new Date(result.Data.blog_date));
        this.blogForm.get('brief').setValue(result.Data.brief);
        this.blogForm.get('canonical').setValue(result.Data.canonical);
        this.blogForm.get('category').setValue(result.Data.category);
        this.blogForm.get('meta_description').setValue(result.Data.meta_description);
        this.blogForm.get('meta_title').setValue(result.Data.meta_title);
        this.blogForm.get('og_description').setValue(result.Data.og_description);
        this.blogForm.get('og_sitename').setValue(result.Data.og_sitename);
        this.blogForm.get('og_title').setValue(result.Data.og_title);
        this.blogForm.get('og_type').setValue(result.Data.og_type);
        this.blogForm.get('og_url').setValue(result.Data.og_url);
        this.blogForm.get('title').setValue(result.Data.title);
        this.blogForm.get('url_slug').setValue(result.Data.url_slug);

        for (let index = 0; index < result.Data.other_image.length; index++) {
          this.blogDetails.push(this.createblogDetails());
          this.blogForm.get('blog_details').controls[index].get('alttext').setValue(result.Data.other_image[index].alttext)
          this.blogForm.get('blog_details').controls[index].get('description').setValue(result.Data.other_image[index].description)
          this.blogForm.get('blog_details').controls[index].get('path').setValue(result.Data.other_image[index].path)
        }
        [this.blogDetails].map((items: any) => {
          items.value = items.value.filter((i: any) => i.alttext != "" || i.description != "" || i.path != "");
          items.controls = items.controls.filter((i: any) => i.value.alttext != "" || i.value.description != "" || i.value.path != "");
          items.status = "VALID"
        });
        if (this.blogDetails.length == 0) {
          this.blogDetails.push(this.createblogDetails());
        }

      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true)
    });
  }


  submitAction() {
    this.isBtnLoading = true;
    if (!this.blogForm.value.banner_image) {
      this._toastr.clear();
      this._toastr.error("Invalid banner image type.", 'Oops!');
      this.isBtnLoading = false;
      return;
    }
    this.hasError = false;
    this.blogForm.value.blog_details.forEach((element: any, index: any) => {
      if (element.path && !element.alttext) {
          this._toastr.clear();
          this._toastr.error("Alter Taxt is Requried.", 'Oops!');
          this.hasError = true;
        // return;
      }
    });
    if (this.hasError) {
      return;
    }
    const blogDetailsObj = {
      blogid: this.blogId !== "blogDetails" ? this.blogId : '',
      banner_image: this.blogForm.value.banner_image ?? '',
      banner_alttext: this.blogForm.value.banner_alttext ?? '',
      category: this.blogForm.value.category ?? '',
      title: this._globalFunctions.toTitleCase(this.blogForm.value.title ?? ''),
      blog_date: this.blogForm.value.blog_date ? moment(this.blogForm.value.blog_date).format('DD-MM-YYYY') : null,
      brief: this.blogForm.value.brief ?? '',
      meta_title: this.blogForm.value.meta_title ?? '',
      url_slug: this.blogForm.value.url_slug ?? '',
      canonical: this.blogForm.value.canonical ?? '',
      og_title: this.blogForm.value.og_title ?? '',
      og_description: this.blogForm.value.og_description ?? '',
      og_url: this.blogForm.value.og_url ?? '',
      og_type: this.blogForm.value.og_type ?? '',
      og_sitename: this.blogForm.value.og_sitename ?? '',
      meta_description: this.blogForm.value.meta_description ?? '',
      other_image: [...(this.blogDetails?.value ?? [])],
      blog_from: "blogsmk"
    };
    this._blogListService.addEditBlog(blogDetailsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this._toastr.clear();
        this._toastr.success(result.Message, 'Success');
        this.isBtnLoading = false;
        this._router.navigate(['/blog-list']);
      } else {
        this.isBtnLoading = false;
        this._globalFunctions.successErrorHandling(result, this, true)
      }
    }, (error: any) => {
      this.isBtnLoading = false;
      this._globalFunctions.errorHanding(error, this, true);
    })
  }

  deleteBlogDetails(index: any) {
    if (this.blogDetails.length > 1) {
      this.other_editor.splice(index, 1);
      this.blogDetails.removeAt(index);
    }
  }

  otherDescriptionLength(event: any = '', i: any) {
    setTimeout(() => {
      if (this.blogId && this.blogId != "blogDetails") {
        this.other_description_length[i] = event?.length
      } else {
        this.other_description_length = typeof(event)=="object" ? toHTML(event).toString().length : event?.length;
      }
      if (event?.length > 10000) {
        this._toastr.clear();
        this._toastr.error("You can not write more story content", 'Oops!');
      }
    })
  }
  BriefLength(event: any = '') {
    if (this.blogId && this.blogId != "blogDetails") {
      this.brief_length = event?.length
    } else {
      this.brief_length = typeof(event)=="object" ? toHTML(event).toString().length : event?.length;
    }
    if (event?.length > 10000) {
      this._toastr.clear();
      this._toastr.error("You can not write more story content", 'Oops!');
    }
  }
}
