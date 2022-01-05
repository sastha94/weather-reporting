export class Weather {
  constructor(
    public cityName: string,
    public currentCondition: string,
    public zipcode: number,
    public maxTemp: any,
    public minTemp: any,
    public feelsLike: any,
    public currentTemp: any,
    public day?: any
  ) {}
}
