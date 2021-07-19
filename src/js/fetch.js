class Data {

  async getData() {
    
    let apiKey = 'd86ed572c82faed38034c23daad4d61e';
    let city = 'London';

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .then((resp) => { return resp.json() })
      .then((data) => {

        // list = data.list

        // let date = new Date(list[0].dt_txt)

        // let startHours = (24 - date.getHours()) / 3
        // let today = []

        // for (let i = 0; i < startHours; i++) {
        //   today.push(list[i])
        //   delete list[i]
        //   return today
        // }
        console.log(data);
        return data;
      })
  }
}
