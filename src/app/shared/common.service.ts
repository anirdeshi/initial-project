import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getdata(): Observable<any> {
    return this.http.get('http://localhost:3000/api/user');
  }

  postdata(postdata: any) {
    debugger;
    let jsonpostdata = JSON.parse(JSON.stringify(postdata));
    return this.http.post('http://localhost:3000/api/postsuser', jsonpostdata);
  }

  getById(id: string) {
    return this.http.get('http://localhost:3000/api/getById/' + id);
  }

  updatedata(id: string, postdata: any) {
    return this.http.put('http://localhost:3000/api/put/' + id, postdata);
  }

  deletedata(id: string) {
    return this.http.delete('http://localhost:3000/api/delete/' + id);
  }

}
