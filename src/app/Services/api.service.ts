import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  JSON_to_URLEncoded(element, key?, list?) {
    let new_list = list || [];
    if (typeof element === 'object') {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + '=' + encodeURIComponent(element));
    }
    return new_list.join('&');
  }

  public post(url, body): Promise<any> {
    // Remove this two lines
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    });

    // Use this when you add server
    return new Promise<any>((resolve, reject) => {
      const header = {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      };
      const param = this.JSON_to_URLEncoded(body);
      console.log(param);
      this.http.post(this.baseUrl + url, param, header).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
