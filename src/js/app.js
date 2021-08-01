import { Data } from './Data'
import { UI } from './UI'
import { WeekData } from './WeekData'
import { LocalStorage } from './LocalStorage'

const data = new Data()
const ui = new UI()
const ls = new LocalStorage()
const wd = new WeekData()

const search = document.querySelector(".app__cart-location-change-text")

search.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    const city = search.value;

    data.getData(city).then((data) => {
      ui.createTodayCard(data)
      ui.createDetailCard(data)
      ui.createWeatherInfo(data)
      ls.saveToLS(data)
      ui.createWeek(wd.getDataDay(data))
    });
    // search.value = ''
  }
});

// event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ls.getFromLS()
  const dataSavedWeek = ls.getFromLS()
  ui.createTodayCard(dataSaved)
  ui.createDetailCard(dataSaved)
  ui.createWeatherInfo(dataSaved)
  ui.createWeek(wd.getDataDay(dataSavedWeek))
});

