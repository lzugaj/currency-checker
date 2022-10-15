# Currency Checker App

This is a simple React app that displays exchange rate data for all currencies on today's date.

This application pulls data from service [HNB API](http://api.hnb.hr/).

## Technologies used in the project
* React JS
* TailwindCSS
* ESlint
* Prettier
* GitHub Actions (CICD pipeline)
* Heroku (Hosting)

## Example result (JSON):
`[{
  "Broj tečajnice": "42",
  "Datum primjene": "02.03.2014",
  "Država": "Australija",
  "Šifra valute": "036",
  "Valuta": "AUD",
  "Jedinica": 1,
  "Kupovni za devize": "4,959778",
  "Srednji za devize": "4,974702",
  "Prodajni za devize": "4,989626"
}]`

## How to run the application locally?
  1. Clone the repository
  2. Open project in prefered editor
  3. Run `yarn start` from terminal
  4. Go to `localhost:3000` in internet browser
  
If you want to take a look, the application is also available at [Tecajna list](https://tecajna-lista.herokuapp.com/).
