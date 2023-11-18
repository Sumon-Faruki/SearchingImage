import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {

  b64jsonData:any
  // OPENAI_API_KEY = "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";
  OPENAI_API_KEY = "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";
  // OPENAI_API_KEY = "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"; 
  constructor(private https:HttpClient) { }


  aiGenerate(srchItem: any, imageQuantityChange: any):Observable<any>{ 
    
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', 'Bearer '+ this.OPENAI_API_KEY);
    headers = headers.set('Content-Type',   "application/json" );


    let body = {
      prompt:  srchItem,
      n: parseInt(imageQuantityChange),
      size: "512x512",
      response_format: "b64_json"
    } 
 
    return this.https.post<any>( 'https://api.openai.com/v1/images/generations', body, {headers});

  }
}
