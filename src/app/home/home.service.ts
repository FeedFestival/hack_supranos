import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(
        private http: HttpClient
    ) { }


    HttpDefaultHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    });

    HttpDefaultOptions = {
        headers: this.HttpDefaultHeaders,
        withCredentials: false,
        'cache': false,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'If-Modified-Since': '0'
    };

    testEnpoint(addr: string): Observable<any> {
        const url = 'https://' + addr + '/home/' + 'testName';
        return this.http.get<any>(url, { observe: 'response', responseType : 'text' } as any);
    }
}
