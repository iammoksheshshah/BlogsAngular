import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LandingComponent } from './landing/landing.component';

const routes:Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:''
  },
  {
    path:'',
    loadChildren: () => import('./landing/landing.module').then(m=>m.LandingModule)
  },
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'blog-list',
    loadChildren: () => import('./blog-list/blog-list.module').then(m=>m.BlogListModule)
  },
  {
    path:'blogs/:urlSlug',
    loadChildren: () => import('./blogs/blogs.module').then(m=>m.BlogsModule)
  },
  {
    path:'category-blogs/:categoryName',
    loadChildren: () => import('./blog-category-list/blog-category-list.module').then(m=>m.BlogCategoryListModule)
  },
  {
    path:'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(m=>m.AboutUsModule)
  },
  {
    path:'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then(m=>m.ContactUsModule)
  },
  {
    path:'disclaimer',
    loadChildren: () => import('./disclaimer/disclaimer.module').then(m=>m.DisclaimerModule)
  },
  {
    path:'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m=>m.PrivacyPolicyModule)
  },
  {
    path:'**',
    component: LandingComponent
  },
]

@NgModule({
  declarations: [
    ContentComponent,
    // LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class ContentModule { }
