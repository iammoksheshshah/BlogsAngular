import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsDetailComponent } from './blogs-detail/blogs-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BlogsDetailComponent
  }
]

@NgModule({
  declarations: [
    BlogsDetailComponent
  ],
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
  ]
})
export class BlogsModule { }
