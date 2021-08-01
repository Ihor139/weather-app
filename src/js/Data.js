export class Data {
  constructor() {
    this.apiKey = 'd86ed572c82faed38034c23daad4d61e';
  }
  
  async getData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`);
    const data = await response.json();
    return data;
  }
}
