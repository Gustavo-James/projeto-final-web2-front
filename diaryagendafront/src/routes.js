import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './views/home';
import About from './views/about';
import RegisterAgenda from './views/register-agenda';
import ListAgenda from './views/list-agenda';
import DetailAgenda from './views/detail-agenda';
import RegisterDiary from './views/register-diary';
import ListDiary from './views/list-diary';
import DetailDiary from './views/detail-diary';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/register-agenda" component={RegisterAgenda} />
    <Route path="/list-agenda" component={ListAgenda} />
    <Route path="/detail-agenda/:id" component={DetailAgenda} />
    <Route path="/register-diary" component={RegisterDiary} />
    <Route path="/list-diary" component={ListDiary} />
    <Route path="/detail-diary/:id" component={DetailDiary} />
  </Switch>
);
export default Routes;
