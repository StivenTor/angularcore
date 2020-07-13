import { Injectable } from "@angular/core";

@Injectable()
export class RouterService {

  constructor() { }

  public static createURL(query: {}, param: any) {
    const keys = Object.keys(query);
    const arr = [];
    for (let i = 0; i < keys.length; ++i) {
      const val = query[keys[i]];
      if (typeof val === "number" && (val === 1 || val === 0)) {
        // val = val ? "true" : "false";
      }
      arr.push(`${keys[i]}=${val}`);
    }
    const dataSend = Object.values(param)
    // .map((v, k) => v === 1 || v === 0 ? (v ? "true" : "false") : v)
    .join("/");


    const completeUrl = arr.length > 0 ? `${dataSend}?${arr.join("&")}` : `${dataSend}`;

    return completeUrl;
  }

}
