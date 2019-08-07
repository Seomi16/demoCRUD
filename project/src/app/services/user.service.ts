import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { GlobalDataService } from './global-data.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL="http://localhost:8080/api"

  constructor(private http: HttpClient
    ) { }
  addData(data){
    return this.http.post(`${this.baseURL}/create`,data);
  }
  upData(data){
    return this.http.put(`${this.baseURL}/update/${data.ID}` , data);
  }  
  deData(id){
    return this.http.delete(`${this.baseURL}/delete/`+ id);
  }  

 
  putUser(data) {
    const apiURL = `http://localhost:3100/api/update?id=${data.ID}`;
    return this.http
      .post(apiURL,data)
      .toPromise()
      .then()
      .catch(this.handleErrorPromise); 
  }
  delUser(data) {
    const apiURL = `http://localhost:3100/api/delete?id=${data}`;
    return this.http
      .post(apiURL,data)
      .toPromise()
      .then()
      .catch(this.handleErrorPromise); 
  }
  addUser(data) {
    const apiURL = `http://localhost:3100/api/create`;
    return this.http
      .post(apiURL,data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  getListUser() {
    const apiURL = `http://localhost:3100/api/alluser`;
    return this.http
      .get(apiURL)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  private handleErrorPromise(error: Response | any) {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
