
import React, { Component } from 'react'
import ReactTable from "react-table";
//import 'react-table/react-table.css'

export default class IternaryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: [],
        }
    }
    async getData() {
        await fetch(`http://localhost:8090/planner/show/iternary/${this.props.data}`)
            .then((res) => {
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
                this.setState({ days: data });
            })
            .catch((error) => {
                console.log(error)
            })


    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const columns = [{
            Header: 'CityName',
            accessor: 'cityName',
        }
            , {
            Header: 'Clouds',
            accessor: 'clouds',
        }

            , {
            Header: 'CountryCode',
            accessor: 'countryCode',
        }
            , {
            Header: 'DateTime',
            accessor: 'dateTime',
        },
        {
            Header: 'IternaryName',
            accessor: 'iternaryName',
        },
        {
            Header: 'Temperature',
            accessor: 'temperature',
        }
        ]
        return (
            <ReactTable
                data={this.state.days}
                columns={columns}
            />
        )
    }
}
