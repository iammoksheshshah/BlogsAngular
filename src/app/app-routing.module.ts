import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './content/login/login.component';
import { ContentComponent } from './content/content.component';
import { AuthGuard } from './auth/auth-guard/auth.guard';
import { NoAuthGuard } from './auth/auth-guard/no-auth.guard';
import { LandingComponent } from './content/landing/landing.component';

const routes: Routes = [
  {
    path:'',
    //canActivate: [AuthGuard],
    component:ContentComponent,
    loadChildren: () => import('./content/content.module').then(m =>m.ContentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
