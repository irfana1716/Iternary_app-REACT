import React from 'react';
import './Iternary.css';
import IternaryList from './IternaryList'

export default class Iternary extends React.Component {
    
    state = {
        city: this.props.city,
        status:false,
        iternaryName: '',
    };
    togglePop = () => {
        // Save Iternary name in whole city table
        fetch(`http://localhost:8090/planner/add/iternary/${this.state.iternaryName}/city/${this.state.city}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            console.log(response);

            if (response.ok) {
                console.log(response.status);
                return response.json();
              } else {
                return Promise.reject(response);
            }
        }).then((data)=> {
            this.setState({status:true})
            console.log('status',this.state.status)
            console.log('first',this.state.iternaryName)

        })
            .catch((error) => {
                console.log(error)
            })
            
    }
  
    handleChange = event => {
        this.setState({ iternaryName: event.target.value });
    }
    render(props) {

        return (
            <div>
                <div className="btn" >
                    <div class="col-auto">
                        <label for="location-name" class="col-form-label">
                            Enter Iternary Name :
                        </label>
                    </div>
                    <div class="col-auto">
                        <input
                            type="text"
                            name="Enter Iternary Name"
                            onChange={this.handleChange}
                            value = {this.state.iternaryName}
                            placeholder='Enter Iternary Name'
                        />
                    </div>
                    <button onClick={this.togglePop}>Save Iternary</button>
                    <div>
                    {this.state.status && <IternaryList data={this.state.iternaryName}/>}

                    </div>
                </div>
            </div>
        )
    }
}


