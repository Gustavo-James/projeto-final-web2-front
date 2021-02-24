import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';

export default class RegisterDiary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: "",
      hour: "",
      objectives: "",
      goals: "",
      thingsDone: "",
      thingsLeftUndone: "",
      thingsToThanks: ""
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
    this.registerDiary();
  }

  registerDiary = async () => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');

    await api.post('/diarys', this.state, headers)
    .then(response => {
      console.log(response);
      alert("Diary registered!");
    })
    .catch(error => {
      console.log(error);
      alert("Error! Registration failed!");
    });
  };

  render() {
    return (
      <div>
        <h2>Diary Registration</h2>

        <form onSubmit={this.handleSubmit}>

          <div>
            <label>Type the date:
              <input name="date" type="text" value={this.state.date} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the hour:
              <input name="hour" type="text" value={this.state.hour} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type your objectives:
              <input name="objectives" type="text" value={this.state.objectives} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type yours goals:
              <input name="goals" type="text" value={this.state.goals} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the things you done today:
              <input name="thingsDone" type="text" value={this.state.thingsDone} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the things you left undone:
              <input name="thingsLeftUndone" type="text" value={this.state.thingsLeftUndone} onChange={this.handleInputChange} />
            </label>
          </div>

          <div>
            <label>Type the things you are grateful for:
              <input name="thingsToThanks" type="text" value={this.state.thingsToThanks} onChange={this.handleInputChange} />
            </label>
          </div>

          <input type="submit" value="Register" />

        </form>
      </div>
    );
  }
}
