import React, { Component } from 'react'
import axios from "axios"
import Summary from './Summary'
import Countries from './Countries'
export default class Details extends Component {
    state = {
        countries: [],
        global: [],
        currentDate: null,
        loading: true
    }
    async componentDidMount() {
        const res = await axios.get("https://api.covid19api.com/summary");
        console.log("summary:", res);
        this.setState({ countries: res.data.Countries });
        this.setState({ global: res.data.Global });
        this.setState({ currentDate: res.data.Date });
        this.setState({ loading: false });
    }
    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }
        return (
            <div>
                <Summary summary={this.state.global} currentDate={this.state.currentDate} />
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>New Confirmed</th>
                            <th>Total Confirmed</th>
                            <th>Total Deaths</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.countries.map(country => (
                            <Countries country={country} key={country.Country} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
