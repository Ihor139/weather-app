export class UI {
  constructor() {
    this.todayHtml = document.querySelector('.app__cart-info')
    this.detailCard = document.querySelector('.app__cart-detail-info')
    this.weatherInfo = document.querySelector('.app__weather-info')
    this.cardContainer = document.querySelector('.app__bottom-inner')
    this.currentTemp = document.querySelector('.app__cart-number-item')
  }

  createTodayCard(data) { 
    this.todayHtml.innerHTML = `
    <div class="app__cart-current-time">
      ${data.list[0].dt_txt.split(' ')[0]}
    </div>
    <div class="app__cart-ico">
      <img src='http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png' />
    </div>

    <div class="app__cart-weather">
      ${data.list[0].weather[0].main}
    </div>

    <div class="app__cart-location-current">
      ${data.city.name}
    </div>
    `
    this.currentTemp.innerHTML = Math.round((data.list[0].main.temp) - 273)
  }

  createDetailCard(data) {
    let humidity = this.detailCard.querySelector('[data-humidity]'),
      airPressure = this.detailCard.querySelector('[data-air-pressure]'),
      rainChance = this.detailCard.querySelector('[data-rain-chance]'),
      speedWind = this.detailCard.querySelector('[data-speed-wind]');

    humidity.textContent = data.list[0].main.humidity + "%"
    airPressure.textContent = data.list[0].main.pressure + "PS"
    speedWind.textContent = data.list[0].wind.speed + "km/h"
    rainChance.textContent = (data.list[0].pop * 100) + "%"

  }

  createWeatherInfo(data) {
    let ico = this.weatherInfo.querySelector('.app__weather-ico'),
      name = this.weatherInfo.querySelector('.app__weather-title')

    ico.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png'/>`
    name.textContent = data.list[0].weather[0].description
  }

  createWeek(data) {
    this.cardContainer.querySelectorAll('.app__cart-detail--small').forEach(el=>{
      el.parentNode.removeChild( el );
    })
    data.forEach(el => {
      let card = document.createElement('div')
      card.classList.add('app__cart', 'app__cart-detail--small')
      card.innerHTML =`
        <div class="app__cart-inner">
          <div class="app__cart-info">
            <div class="app__cart-date">
              ${el.date}
            </div>
            <div class="app__cart-ico">
            <img src='http://openweathermap.org/img/wn/${el.icon}.png'/>
            </div>
          </div>
          <div class="app__cart-numbers">
            <div class="app__cart-number">
              <div class="app__cart-number-item">
                ${el.tempMin} °C
              </div>
              <div class="app__cart-number-info">
                min
              </div>
            </div>
            <div class="app__cart-number">
              <div class="app__cart-number-item">
              ${el.tempMax} °C
              </div>
              <div class="app__cart-number-info">
                max
              </div>
            </div>
          </div>
        </div>`
      
      this.cardContainer.appendChild(card)
    });
  }

}
