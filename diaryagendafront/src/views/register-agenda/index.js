import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';

export default class RegisterAgenda extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appointment: "",
      date: "",
      start_time: "",
      end_time: "",
      importance: "",
      urgency: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]:value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("state sent -> " + this.state);
    this.registerAgenda();
  }

  registerAgenda = async () => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');

    await api.post('/agendas', this.state, headers)
    .then(response => {
      console.log(response);
      alert("Agenda registered!");
    })
    .catch(error => {
      console.log(error);
      alert("Error! Registration failed!");
    });
  };

  render() {
    return (
      <div>
        <h2>Agenda Registration</h2>

        <form onSubmit={this.handleSubmit}>

          <div>
            <label>Type your appointment:
              <input name="appointment" type="text" value={this.state.appointment} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the date:
              <input name="date" type="text" value={this.state.date} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the star time:
              <input name="start_time" type="text" value={this.state.start_time} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the end time:
              <input name="end_time" type="text" value={this.state.end_time} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the importance:
              <input name="importance" type="text" value={this.state.importance} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the urgency:
              <input name="urgency" type="text" value={this.state.urgency} onChange={this.handleInputChange} />
            </label>
          </div>

          <input type="submit" value="Register" />

        </form>
      </div>
    );
  }
}
