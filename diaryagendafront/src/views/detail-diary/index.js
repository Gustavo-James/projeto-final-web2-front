import React, { Component } from 'react';
import api from '../../services/api.js';
import './style.css';

export default class DetailDiary extends Component {

  state = {
    id: "",
    date: "",
    hour: "",
    objectives: "",
    goals: "",
    thingsDone: "",
    thingsLeftUndone: "",
    thingsToThanks: ""
  };

  constructor(props) {
    super(props);

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
    this.updateDiary();
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/diarys/${id}`);
    console.log(`id: ${id}`);
    this.setState(
      {
        id: id,
        date: response.data.date,
        hour: response.data.hour,
        objectives: response.data.objectives,
        goals: response.data.goals,
        thingsDone: response.data.thingsDone,
        thingsLeftUndone: response.data.thingsLeftUndone,
        thingsToThanks: response.data.thingsToThanks
      });
  }

  deleteDiary = async () => {
    const { id } = this.state;
    const response = await api.delete(`/diarys/${id}`);
    if(response.status === 200) {
      alert("Appointment successfully deleted!");
      this.props.history.push('/list-user');
    }
  }

  updateDiary = async () => {
    await api.put(`/diarys`, this.state)
    .then(response => {
      alert("Appointment successfully updated!");
      this.props.history.push('/list-diary');
    })
    .catch(error => {
      alert("Error when updating")
    })
  }

  render() {

    const { id, date, hour, objectives, goals, thingsDone, thingsLeftUndone, thingsToThanks } = this.state;

    return (
      <div className="detail-diary">
        <h2>Appointment detail</h2>
        <h2>{date}</h2>
        <p>
        Code: {id} <br />
        Hour: {hour} <br />
        Objectives: {objectives} <br />
        Goals: {goals} <br />
        ThingsDone: {thingsDone} <br />
        ThingsLeftUndone: {thingsLeftUndone} <br />
        ThingsToThanks: {thingsToThanks} <br />
        </p>

        <h2>Diary page update</h2>
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

        <button onClick={() => this.deleteDiary()}>
        Delete page
        </button>
      </div>

    );
  }
}
