import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private httpResponseCache: { [key: string]: HttpResponse<any>} = {};

  put = (key: string, httpResponse: HttpResponse<any>): void =>{
    console.log('Caching response', httpResponse);
    this.httpResponseCache[key] = httpResponse;
  }

  get = (key: string): HttpResponse<any> | null | undefined => this.httpResponseCache[key];

  evict = (key: string): boolean => this.httpResponseCache[key] = null;

  evictAll = (): void => {
   console.log('Clearing entire cache');
    this.httpResponseCache = null;
  }

  logCache = (): void => console.log(this.httpResponseCache);
}
