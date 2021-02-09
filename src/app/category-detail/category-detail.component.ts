import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BlogService } from '../blog.service';
import { Category } from '../category';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  current_cat:Category | null = null;
  
  constructor(private route:ActivatedRoute,
    private blogService: BlogService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(){
    const id = this.route.snapshot.paramMap.get('id');
    var id_num:number = Number(id);
    this.blogService.getCategory(id_num).subscribe((data:any)=>{
      this.current_cat = data;
    })
  }

  
  onBack(): void {
    this.location.back();
  }

  onSave():void {
    this.blogService.updateCategory(this.current_cat)
      .subscribe(() => this.onBack());
  }
}
