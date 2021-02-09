import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';

import {Blog} from './blog';
import {Category} from './category';

import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError,map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private BLOG_URL = "http://localhost:3000/table_data";
  private CATEGORY_URL = "http://localhost:3000/table_data_category";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //constructor(){}

  constructor(private httpClient: HttpClient) { }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
  public getBlogs(){
    return this.httpClient.get(this.BLOG_URL).pipe(retry(3), catchError(this.handleError));
  }

  public getBlog(id:number){
    const url = `${this.BLOG_URL}/${id}`;
    return this.httpClient.get<Blog>(url).pipe(retry(3), catchError(this.handleError));
  }

  public getCategory(id:number){
    const url = `${this.CATEGORY_URL}/${id}`;
    return this.httpClient.get<Category>(url).pipe(retry(3), catchError(this.handleError));
  }
  
  public getCategories(){
    return this.httpClient.get(this.CATEGORY_URL).pipe(retry(3), catchError(this.handleError));
  }

  updateBlog(blog: Blog | null){
    return this.httpClient.put(`${this.BLOG_URL}/${blog?.id}`, blog, this.httpOptions).pipe();
  }

  updateCategory(cat: Category | null){
    return this.httpClient.put(`${this.CATEGORY_URL}/${cat?.id}`, cat, this.httpOptions).pipe();
  }
}
