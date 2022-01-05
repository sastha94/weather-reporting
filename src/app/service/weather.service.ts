import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../shared/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  serviceUrl = environment.apiUrl;
  imageUrl = environment.imagePath;

  constructor(private http: HttpClient) {}

  getWeatherData(code: number): Observable<any> {
    return this.http.get<any>(
      this.serviceUrl + "/weather?zip=" + code + "&units=imperial"
    );
  }

  getRecentData(code: number): Observable<any> {
    return this.http.get<any>(
      this.serviceUrl + "/forecast/daily?zip=" + code + "&cnt=5&units=imperial"
    );
  }

  getImagePath(climate: string) {
    return climate != "Clear"
      ? this.imageUrl + climate.toLowerCase() + ".png"
      : this.imageUrl + "sun.png";
  }
}
