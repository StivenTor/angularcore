import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { LoadingService } from "./loading.service";
import { RequestOptions } from "@angular/http";

@Injectable()
export class HttpClientService {

  groupKey = "mapfre";
  ttl: number = 60 * 60;
  delayType = "all";
  // send new request to server everytime, if it's set to none it will send new request only when entry is expired

  constructor(
    public httpClient: HttpClient,
    // private cache: CacheService
  ) { }

  public get(url: string, cached: boolean, loading = true) {

    return Observable.create(observer => {

      // let url = ConfigServiceProvider.apiUrl + endPoint;
      const cacheKey = url;
      const request = this.httpClient.get(url);

      // if(cached){
      //   // let response
      //   request = this.cache.loadFromDelayedObservable(cacheKey, request, this.groupKey, this.ttl, this.delayType);
      // }
      if (loading) {
        LoadingService.isLoading = true;
      }

      request.subscribe(
        data => {

          if (loading) {
            LoadingService.isLoading = false;
          }

          observer.next({ status: true, data: data });
          observer.complete();
        },
        err => {

          if (loading) {
            LoadingService.isLoading = false;
          }

          observer.next({ status: false, data: err });
          observer.complete();
        },
        () => { }
      );

    });
  }

  public post(url: string, body: any, cached: boolean) {
    return Observable.create(observer => {

      // let url = ConfigServiceProvider.apiUrl + endPoint;
      const cacheKey = url;
      const request = this.httpClient.post(url, body);

      // if(cached){
      //   request = this.cache.loadFromDelayedObservable(cacheKey, request, this.groupKey, this.ttl, this.delayType);
      // }

      LoadingService.isLoading = true;

      request.subscribe(
        (data: any) => {

          LoadingService.isLoading = false;
          // data["message"] = "";
          if (data.message && data.message !== "") {
            const messageArray = data.message.split("|");
            data["message"] = messageArray.length > 2 ? messageArray[2] : data.message;
          }

          observer.next({ status: true, data: data });
          observer.complete();
        },
        (err: any) => {

          LoadingService.isLoading = false;

          const messageArray = err.error.error.message.split("|");
          err.error.error["message"] = messageArray.length > 2 ? messageArray[2] : err.error.error.message;
          observer.next({ status: false, data: err.error.error });
          observer.complete();
        },
        () => { }
      );

    });
  }

  public fileUpload(url: string, parameter, file: File) {



    return Observable.create(observer => {

      // const customHeader = new Headers();
      // customHeader.append("Content-Type", "multipart/form-data");
      // customHeader.append("Accept", "application/json");

      const httpOptions = {
        headers: new HttpHeaders({
          "Accept": "application/json"
        })
      };

      const formData: FormData = new FormData();
      formData.append(parameter, file, file.name);

      // let url = ConfigServiceProvider.apiUrl + endPoint;
      // const cacheKey = url;
      const request = this.httpClient.post(url, formData, httpOptions);

      // if(cached){
      //   request = this.cache.loadFromDelayedObservable(cacheKey, request, this.groupKey, this.ttl, this.delayType);
      // }

      LoadingService.isLoading = true;

      request.subscribe(
        (data: any) => {

          LoadingService.isLoading = false;
          // data["message"] = "";
          if (data.message && data.message !== "") {
            const messageArray = data.message.split("|");
            data["message"] = messageArray.length > 2 ? messageArray[2] : data.message;
          }

          observer.next({ status: true, data: data });
          observer.complete();
        },
        (err: any) => {
          LoadingService.isLoading = false;

          console.log(err);

          // const messageArray = err.message ? err.message : err.error.error.message.split("|");
          // err.error.error["message"] = messageArray.length > 2 ? messageArray[2] : err.error.error.message;

          observer.next({ status: false, data: err.error.error });
          observer.complete();
        },
        () => { }
      );

    });

    // // const file: File = fileList[0];
    // const formData: FormData = new FormData();
    // formData.append(parameter, file, file.name);
    // const headers = new Headers();
    // /** In Angular 5, including the header Content-Type can invalidate your request */
    // headers.append("Content-Type", "multipart/form-data");
    // headers.append("Accept", "application/json");
    // const options = new RequestOptions(); // { headers: headers }
    // const request = this.httpClient.post(url, formData, options);
    //   // .map(res => res.json())
    //   // .catch(error => Observable.throw(error))
    //   // .subscribe(
    //   //   data => console.log("success"),
    //   //   error => console.log(error)
    //   // );

    // const formData = new FormData();
    // formData.append("upload", file);

    // const params = new HttpParams();

    // const options = {
    //   params: params,
    //   reportProgress: true,
    // };

    // const req = new HttpReques("POST", url, formData, options);
    // return this.httpClient.request(req);
  }

}