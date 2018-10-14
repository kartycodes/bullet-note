[%bs.raw {|require('./app.css')|}];

[@bs.module] external logo : string = "./logo.svg";


let component = ReasonReact.statelessComponent("App");

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
