import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AlarmService {
    resourceUrl = 'https://0a6d7ff92034.ngrok.io';
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
    
    createSchedule(body: any): Observable<any> {
        return this.http.post<any>(`${this.resourceUrl}/schedule`, body);
    }

    updateSchedule(body: any): Observable<any> {
        return this.http.put<any>(`${this.resourceUrl}/schedule`, body);
    }
}