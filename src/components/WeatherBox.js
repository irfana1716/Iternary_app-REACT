import React from 'react';
import './WeatherBox.css';

export default class WeatherBox extends React.Component {
  // returns weekday to a given Date value
  getDay = date => {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    return weekday[new Date(date).getDay()];
  };

  render(props) {
    return (
      <div className='weather-box'>
        <h1>{this.props.dateTime ? this.getDay(this.props.dateTime) : ''}</h1>
        <img src ={`http://openweathermap.org/img/w/${this.props.icon}.png`}/>
        <span className='temp-1'>{Math.round(this.props.temperature - 273.15)}°C</span>
        <span className='temp'>{this.props.clouds}</span>

      </div>
    );
  }
}
