import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  { path:'', redirectTo:'Blog', pathMatch:'full' },
  { path:'Blog', component:BlogComponent },
  { path: 'blog-detail/:id', component: BlogDetailComponent },
  { path: 'category-detail/:id', component: CategoryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
