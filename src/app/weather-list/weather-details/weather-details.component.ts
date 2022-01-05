import { ViewEncapsulation } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Weather } from '../../model/weather.model';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  @Input() getWeatherData: Weather
  @Input() getIndex: number
  @Output() setrequestData = new EventEmitter<{id: number, code: number}>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getImage(climate: string): string {
    return this.weatherService.getImagePath(climate);
  }

  removeCode(id: number, zipcode: number){
    let locations = {
      id: id,
      code: zipcode
    }
    this.setrequestData.emit(locations);
  }

}
