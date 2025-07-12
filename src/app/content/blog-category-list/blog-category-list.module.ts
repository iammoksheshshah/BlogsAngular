import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCategoryListComponent } from './blog-category-list.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

const routes: Routes = [
  {
    path: '',
    component: BlogCategoryListComponent
  }
]

@NgModule({
  declarations: [
    BlogCategoryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PaginatorModule
  ]
})
export class BlogCategoryListModule { }
