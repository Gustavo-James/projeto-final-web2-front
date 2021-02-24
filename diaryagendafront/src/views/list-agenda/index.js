import React, { Component } from 'react';
import api from '../../services/api.js';
import { Link } from 'react-router-dom';
import './style.css';

export default class ListAgenda extends Component {

  state = {
    agendas: [],
  }

  componentDidMount() {
    this.loadAgendas();
  }

  loadAgendas = async () => {
    const response = await api.get("/agendas");
    this.setState({agendas: response.data["agendas"]});
  }

  render() {

    const { agendas } = this.state;

    return (
      <div>
        <h2>Agenda List</h2>
        <p>Agendas Quantity {agendas.length}</p>
        <div className="agendas-list">
        {agendas.map(agenda => (
          <article key={agenda.id} id="agenda-article">
            <p>
            Code: {agenda.id} <br />
            Appointment: {agenda.appointment} <br />
            Date: {agenda.date} <br />
            Start Time: {agenda.start_time} <br />
            End Time: {agenda.end_time} <br />
            Importance: {agenda.importance} <br />
            Urgency: {agenda.urgency}
            </p>
            <Link to={`/detail-agenda/${agenda.id}`}>Appointment details</Link>
          </article>
        ))}
        </div>
      </div>
    );
  }
}
