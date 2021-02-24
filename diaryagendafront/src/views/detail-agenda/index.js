import React, { Component } from 'react';
import api from '../../services/api.js';
import './style.css';

export default class DetailAgenda extends Component {

  state = {
    id: "",
    appointment: "",
    date: "",
    start_time: "",
    end_time: "",
    importance: "",
    urgency: ""

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
    this.updateAgenda();
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/agendas/${id}`);
    console.log(`id: ${id}`);
    this.setState(
      {
        id: id,
        appointment: response.data.appointment,
        date: response.data.date,
        start_time: response.data.start_time,
        end_time: response.data.end_time,
        importance: response.data.importance,
        urgency: response.data.urgency
      });
  }

  deleteAgenda = async () => {
    const { id } = this.state;
    const response = await api.delete(`/agendas/${id}`);
    if(response.status === 200) {
      alert("Appointment successfully deleted!");
      this.props.history.push('/list-user');
    }
  }

  updateAgenda = async () => {
    await api.put(`/agendas`, this.state)
    .then(response => {
      alert("Appointment successfully updated!");
      this.props.history.push('/list-agenda');
    })
    .catch(error => {
      alert("Error when updating")
    })
  }

  render() {

    const { id, appointment, date, start_time, end_time, importance, urgency } = this.state;

    return (
      <div className="detail-agenda">
        <h2>Appointment detail</h2>
        <h2>{appointment}</h2>
        <p>
        Code: {id} <br />
        Date: {date} <br />
        Start time: {start_time} <br />
        End time: {end_time} <br />
        Importance: {importance} <br />
        Urgency: {urgency} <br />
        </p>

        <h2>Appointment update</h2>
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

          <input type="submit" value="Update" />

        </form>

        <button onClick={() => this.deleteAgenda()}>
        Delete appointment
        </button>
      </div>

    );
  }
}
