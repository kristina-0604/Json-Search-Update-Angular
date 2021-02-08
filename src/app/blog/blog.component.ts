import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog, BlogDisplayType } from '../blog';
import { Category } from '../category';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  searchText: string;
  blogs: Blog[] = [];
  blog_display_datas: BlogDisplayType[] = [];
  categories: Category[] = [];
  constructor(private blogService: BlogService) { }
  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((data: any) => {

      this.blogs = data;
      for (var i = 0; i < this.blogs.length; i++) {
        var tmp: BlogDisplayType = { id: 0, img_url: "", text: "", title: "", is_active: false, category_name: "" };
        tmp.id = this.blogs[i].id;
        tmp.img_url = this.blogs[i].img_url;
        tmp.text = this.blogs[i].text;
        tmp.title = this.blogs[i].title;
        tmp.is_active = this.blogs[i].is_active;
        this.blog_display_datas.push(tmp);
      }

      if(this.categories){
        for (var i = 0; i < this.blog_display_datas.length; i++) {
          this.blog_display_datas[i].category_name = this.categories[this.blogs[i].category_id - 1].name;
        }
      }

    });

    this.blogService.getCategories().subscribe((data: any) => {
      this.categories = data;
      for (var i = 0; i < this.blog_display_datas.length; i++) {
        this.blog_display_datas[i].category_name = this.categories[this.blogs[i].category_id - 1].name;
      }
    });
  }
}
