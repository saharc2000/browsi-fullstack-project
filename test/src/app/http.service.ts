import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Publisher, Domain} from "./types";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    publishersUrl = 'http://localhost:4300/api/publishers';
    domainsUrl = 'http://localhost:4300/api/domains';
    constructor(private http: HttpClient) {
    }

    getPublishers(): Observable<any> {
        console.log('Fetching publishers...');
        return this.http.get(this.publishersUrl);
    }

    addPublisher(publisher: Publisher): Observable<any> {
        console.log('Adding publisher...');
        console.log(publisher);
        return this.http.post(this.publishersUrl, {publisher});
    }

    deletePublisher(publisher: Publisher): Observable<any> {
        console.log('Deleting publisher...');
        const url = `${this.publishersUrl}/${publisher.publisher}`;
        return this.http.delete(url);
    }

    getDomains(): Observable<any> { 
        console.log('Fetching domains...');
        return this.http.get(this.domainsUrl)
    }
}
