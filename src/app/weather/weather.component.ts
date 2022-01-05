import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WeatherService } from "../service/weather.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Weather } from "../model/weather.model";
import { environment } from "../shared/environment";
@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
  zipCode: any = "";
  cityName: string;
  weatherData: Weather[] = [];
  constructor(
    private route: ActivatedRoute,
    private weather: WeatherService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  imageUrl = environment.imagePath;
  ngOnInit() {
    this.zipCode = this.route.snapshot.params.zipcode;
    this.weather.getRecentData(this.zipCode).subscribe((res) => {
      if (res.cod == 200) {
        this.cityName = res.city.name;
        for (let data of res.list) {
          this.weatherData.push(
            new Weather(
              res.city.name,
              data.weather[0].main,
              this.zipCode,
              data.temp.max,
              data.temp.min,
              data.feels_like.day,
              data.temp.day,
              data.dt
            )
          );
        }
        console.log(this.weatherData);
      } else {
        this.toaster.error("Sorry Forecasting not found!");
        this.router.navigate["/"];
      }
    });
  }
  getImage(climate: string) {
    return this.weather.getImagePath(climate);
  }
}
