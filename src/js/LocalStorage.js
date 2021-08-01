export class LocalStorage {
  saveToLS(data) {
    localStorage.setItem("city", JSON.stringify(data));
  }

  getFromLS() {
    if (localStorage.getItem("city" == null)) {
      return this.defaultCity;
    } else {
      this.city = JSON.parse(localStorage.getItem("city"));
    }
    return this.city;
  }

  clearLS() {
    localStorage.clear();
  }
}
