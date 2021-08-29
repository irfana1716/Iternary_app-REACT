import React from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow';
import CityInput from './components/CityInput';
import WeatherBox from './components/WeatherBox';

class App extends React.Component {
  state = {
    city: undefined,
    // days contains objects with the following properties:
    // cityName, clouds, countryCode, dateTime ,iternaryName,temperature
    days: new Array(5)
  };

  // creates the day objects and updates the state
  updateState = data => {
    const city = data.city.name;
    const days = [];
    const dailyData = data.list.filter(time => time.dt_txt.includes("12:00:00"))

    for (let i = 0; i < 5; i++) {
      days.push({
        cityName: data.city.name,
        clouds: dailyData[i].weather[0].description,
        icon: dailyData[i].weather[0].icon,
        countryCode: data.city.country,
        iternaryName: '',
        temperature: dailyData[i].main.temp,
        dateTime: dailyData[i].dt_txt
      });
    }

    this.setState({
      city: city,
      days: days
    });
    console.log('datbase data', JSON.stringify(
      this.state.days
    ))
    this.dataPush(this.state.days)
  };

  dataPush = days => {
    fetch('http://localhost:8090/planner/add/report', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(days)

    }).then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
  }

//Calling if data is not available in database.
makeApiCall =  city => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9c557eceafa0a2d219067278e44b7c7c&units=metric}`
    ).then((res) => {
      if (res.ok) {
        console.log(res.status);
        return res.json();
      }
      else {
        if (res.status === 404) {
          return alert("There is something went wrong.Please try again with different location")
        }
      }
    })
      .then((data) => {
        this.updateState(data);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    const WeatherBoxes = () => {
      console.log("the value is ", this.state.days)
      const weatherBoxes = this.state.days && this.state.days.map(day => (
        <li>
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };

    return (
      <div className='App'>
        <header className='App-header'>
          <MainWeatherWindow data={this.state.days[0]} city={this.state.city}>
            <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
            <WeatherBoxes />
          </MainWeatherWindow>

        </header>
      </div>
    );
  }
}

export default App;
