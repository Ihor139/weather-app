export class WeekData {
  getDataDay(data) {
    let list = data.list
    let date = new Date(list[0].dt_txt)
    let startHours = (24 - date.getHours()) / 3
    let today = []

    for (let i = 0; i < startHours; i++) {
      today.push(list[i])
      delete list[i]
    }

    let dayList = []
    let newDayData = []
    let dayData
    let size = 8

    dayList = list.reduce((p, c) => {
      if (p[p.length - 1].length == size) {
        p.push([])
      }
      p[p.length - 1].push(c)
      return p
    }, [[]])

    dayList.forEach(el => {
      let temp = [], icon,
        date = el[0].dt_txt.split(' ')[0]

      el.forEach(el => {
        if (el.dt_txt.split(' ')[1] === '12:00:00') {
          icon = el.weather[0].icon
        }
        temp.push(el.main.temp_min, el.main.temp_max)
        return temp, icon
      })

      let tempMin = Math.round(Math.min(...temp) - 273),
        tempMax = Math.round(Math.max(...temp) - 273)

      dayData = { tempMin, tempMax, date, icon }
      newDayData.push(dayData)

      return newDayData
    })
    return newDayData
  }
}
