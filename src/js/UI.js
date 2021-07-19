class UI {
  constructor() {
    this.todayHtml = document.querySelector('.app__cart-info');
    this.currentTemp = document.querySelector('.app__cart-number-item')
  }

  createTodayCard(dataToday) {
    todayHtml.innerHTML = `
    <div class="app__cart-current-time">
      ${today[0].dt_txt}
    </div>
    <div class="app__cart-ico">
      <img src='http://openweathermap.org/img/wn/${today[0].weather[0].icon}.png' />
    </div>

    <div class="app__cart-weather">
      ${today[0].weather[0].main}
    </div>

    <div class="app__cart-location-current">
      ${data.city.name}
    </div>
    `
    currentTemp.innerHTML = Math.round((today[0].main.temp) - 273)

  }

  createWeek(dataWeek) {
    
  }

}
