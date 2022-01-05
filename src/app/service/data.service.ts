import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, forecast: any) {
    localStorage.setItem(key, JSON.stringify(forecast));
  }
}
