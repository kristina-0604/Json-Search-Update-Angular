import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BLOG_URL = "http://localhost:3000/table_data";
  private CATEGORY_URL = "http://localhost:3000/table_data_category";


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
  
  public getCategories(id:number){
    const url = `${this.BLOG_URL}/${id}`;
    return this.httpClient.get<Blog>(url).pipe(retry(3), catchError(this.handleError));
  }

  public getBlogs(){
    return this.httpClient.get(this.CATEGORY_URL).pipe(retry(3), catchError(this.handleError));
  }

}