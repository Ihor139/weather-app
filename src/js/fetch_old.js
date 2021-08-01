let list = [];

fetch('https://api.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=d86ed572c82faed38034c23daad4d61e')
  .then((resp) => { return resp.json() })
  .then((data) => {

    list = data.list

    let date = new Date(list[0].dt_txt)

    let startHours = (24 - date.getHours()) / 3
    console.log(startHours);
    let today = []

    for (let i = 0; i < startHours; i++) {
      today.push(list[i])
      delete list[i]
    }
    console.log(today[0]);
    console.log(list);

    let todayHtml = document.querySelector('.app__cart-info')
    let currentTemp = document.querySelector('.app__cart-number-item')

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
  })
