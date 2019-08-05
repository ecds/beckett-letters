import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Landing from './components/landing';
import People from './components/people';
import Letters from './components/letters';
import Header from './components/header';
import LocationPath from './components/location-path';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
      <LocationPath />
      <Route exact path="/" component={Landing} />
      <Route exact path="/people" component={People} />
      <Route exact path="/letters" component={Letters} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
