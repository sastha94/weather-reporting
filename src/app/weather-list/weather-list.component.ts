import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Weather } from "../model/weather.model";
import { WeatherService } from "../service/weather.service";
import { DataService } from "../service/data.service";
import { ToastrService } from "ngx-toastr";
import { WeatherData } from "../shared/weather-data";

@Component({
  selector: "app-weather-list",
  templateUrl: "./weather-list.component.html",
  styleUrls: ["./weather-list.component.css"],
    encapsulation: ViewEncapsulation.None

})
export class WeatherListComponent implements OnInit {
  weatherData: Weather[] = [];
  zipCodes: number[] = [];

  constructor(
    private weatherService: WeatherService,
    private toaster: ToastrService,
    private dataSerive: DataService
  ) {}

  imagePath: string = this.weatherService.imageUrl;

  ngOnInit(): void {
    let localData = this.dataSerive.getItem("zipCode");
    if (localData) {
      for (let data of localData) {
        this.weatherService.getWeatherData(data).subscribe((res) => {
          if (res.cod == 200) {
            const resData = new Weather(
              res.name,
              res.weather[0].main,
              data,
              res.main.temp_max,
              res.main.temp_min,
              res.main.feels_like,
              res.main.temp
            );
            this.weatherData.unshift(resData);
          }
        });
      }
    }
  }

  onSubmit(formData: NgForm): void {
    let isExists = false;
    let zipCode = formData.value.zipcode;
    formData.resetForm();
    let localData = this.dataSerive.getItem("zipData");
    if (localData) {
      this.zipCodes = localData;
    }

    let idx = this.weatherData.findIndex(
      (elem: { zipcode: number }) => elem.zipcode === zipCode
    );
    if (idx !== -1) {
      isExists = true;
    }
    if (isExists) {
      isExists = false;
      this.toaster.warning("Already location " + zipCode + " is added");
    } else {
      this.weatherService.getWeatherData(zipCode).subscribe((res) => {
        {
          if (res.cod == 200) {
            const resData = new Weather(
              res.name,
              res.weather[0].main,
              zipCode,
              res.main.temp_max,
              res.main.temp_min,
              res.main.feels_like,
              res.main.temp
            );
            this.weatherData.unshift(resData);
            this.zipCodes.unshift(zipCode);
            this.dataSerive.setItem("zipCode", this.zipCodes);
            this.toaster.success("Location is added!");
          } else {
            this.toaster.error("Location not added!");
          }
        }
      });
    }
  }

  removeRequest(event: WeatherData): void {
    this.weatherData.splice(event.id, 1);
    this.toaster.info("Location " + event.code + " is Removed");
  }


  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
     return true;
  }
}
