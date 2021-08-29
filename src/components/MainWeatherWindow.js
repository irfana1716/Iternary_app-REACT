import React from 'react';
import './MainWeatherWindow.css';
import Iternary from './Iternary';


export default class MainWeatherWindow extends React.Component {

  render(props) {
    const Title = this.props.city ? null : <h1 className='title'>Travel Planner</h1>;

    return (
      <div className='main'>
        <div className='inner-main'>
          {Title}
          <div
            className='today'
          >
            <h1>{this.props.city}</h1>
          </div>
        </div>
        {this.props.children}
        {this.props.data ? <Iternary city={this.props.city} /> : <div></div>}

      </div>
    );
  }
}
