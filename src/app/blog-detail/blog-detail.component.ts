import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { Category } from '../category';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  currentBlog: Blog | null = null;
  categories:Category[] = [];
  current_category_name:string="";
  cat_id:number = -1;

  constructor(
    private route:ActivatedRoute,
    private blogService: BlogService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBlog();
    this.blogService.getCategories().subscribe((data:any)=>{
      this.categories = data;
      if(this.cat_id != -1)  this.current_category_name = this.categories[this.cat_id - 1].name;
    });
  }

  getBlog():void{
    const id = this.route.snapshot.paramMap.get('id');
    var id_num:number = Number(id);
    this.blogService.getBlog(id_num).subscribe((blog:Blog) => {
      this.currentBlog = blog;
      this.cat_id = this.currentBlog?.category_id;
      
      if(this.categories)    this.current_category_name = this.categories[this.cat_id - 1].name;
      if(this.cat_id != -1)  this.current_category_name = this.categories[this.cat_id - 1].name;
      
    });
  }
  
  onBack(): void {
    this.location.back();
  }

  onSave(): void {
    for(var i:number=0; i<this.categories.length; i++)
    {
      if(this.current_category_name == this.categories[i].name)
      {        
        if(this.currentBlog)  
        {
          this.currentBlog.category_id = i+1;
          break;
        }
      }
    }
    this.blogService.updateBlog(this.currentBlog)
      .subscribe(() => this.onBack());
  }
}
