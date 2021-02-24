import React, { Component } from 'react';
import api from '../../services/api.js';
import { Link } from 'react-router-dom';
import './style.css';

export default class ListDiary extends Component {

  state = {
    diarys: [],
  }

  componentDidMount() {
    this.loadDiarys();
  }

  loadDiarys = async () => {
    const response = await api.get("/diarys");
    this.setState({diarys: response.data["diarys"]});
  }

  render() {

    const { diarys } = this.state;

    return (
      <div>
        <h2>Diary List</h2>
        <p>Diarys Quantity {diarys.length}</p>
        <div className="diarys-list">
        {diarys.map(diary => (
          <article key={diary.id} id="diary-article">
            <p>
            Code: {diary.id} <br />
            Date: {diary.date} <br />
            Hour: {diary.hour} <br />
            Objectives: {diary.objectives} <br />
            Goals: {diary.goals} <br />
            Things done: {diary.thingsDone} <br />
            Things left undone: {diary.thingsLeftUndone} <br />
            Things to thanks: {diary.thingsToThanks}
            </p>
            <Link to={`/detail-diary/${diary.id}`}>Diary page details</Link>
          </article>
        ))}
        </div>
      </div>
    );
  }
}
