import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  currentBlog: Blog | null = null;

  constructor(
    private route:ActivatedRoute,
    private blogService: BlogService,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog():void{
    const id = this.route.snapshot.paramMap.get('id');
    var id_num:number = Number(id);
    console.log(id_num);
    this.blogService.getBlog(id_num)
    .subscribe(blog => this.currentBlog = blog);
  }
  
  onBack(): void {
    this.location.back();
  }

  onSave(): void {
    this.blogService.updateBlog(this.currentBlog)
      .subscribe(() => this.onBack());
  }
}
