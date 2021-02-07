import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  searchText:string;
  blogs:Blog[] = [];
  //constructor() { }

  constructor(private dataService : BlogService){}

  ngOnInit(): void {

    this.dataService.getBlogs().subscribe((data:any)=>{
      console.log(data);
      this.blogs = data;
    })

  }

}
