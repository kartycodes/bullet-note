[%bs.raw {|require('./app.css')|}];

[@bs.module] external logo : string = "./logo.svg";

type state = {
  weather : WeatherData.weather
}; 

type action = 
  |  WeatherLoaded(WeatherData.weather); 

let component = ReasonReact.statelessComponent("App");

let dummyWeather: WeatherData.weather = {
  summary: "Warm throughout the day",
  temp : 30.5
}

let make = (~message, _children) => {
  ...component,

  initialState = () => {
    weather: dummyWeather;
  }, 

  reducer: (action, _prevState) => {
    switch action {
    | WeatherLoaded(newWeather) => 
      ReasonReact.Update({
        weather: newWeather
      })
    };
  },

  render: _self =>
    <div className="App">
      <p> (ReasonReact.stringToElement(self.state.weather.summary))</p>s
    </div>,
};
