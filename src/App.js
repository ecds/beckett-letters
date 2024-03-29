import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import BrowseLettersTabs from './components/utilities/BrowseLettersTabs';
import EntityDetails from './components/pages/EntityDetails';
import Landing from './components/pages/Landing';
import LetterDetails from './components/pages/LetterDetails';
import LettersBy from './components/pages/LettersBy';
import PersonDetails from './components/pages/PersonDetails';
import RepositoryDetails from './components/pages/RepositoryDetails';
import Sidebar from './components/utilities/Sidebar';
import Timeline from './components/pages/Timeline';
import FilterSearch from './components/pages/FilterSearch';

library.add(faSpinner, faSearch)

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      entityTypes: []
    };
  }

  render() {

    return (
      <Router buildname="build">
        <Container fluid className="p-0">
          <Sidebar />
          <Switch>
            <Route exact path="/browse-letters" component={BrowseLettersTabs} />
            <Route exact path='/browse-letters-attendance' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType={'attendance'}
              placeholder={"ex. 'Come Back Africa'"}
              tableHeader={'Attendance Name'}
              metaTitle={'Browse by Attendance'}
            />}
            />
            <Route exact path='/browse-letters-music' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType={'music'}
              placeholder={"ex. 'Violin Sonatas'"}
              tableHeader={'Music Title'}
              metaTitle={'Browse by Music'}
            />}
            />
            <Route exact path='/browse-letters-organization' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='organization'
              placeholder={"ex. 'University of Toronto'"}
              tableHeader={'Organization Name'}
              metaTitle={'Browse by Organizations'}
            />}
            />
            <Route exact path='/browse-letters-person' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props} 
              entityType={'person'}
              placeholder={"ex. 'Kay Boyle'"}
              tableHeader={'Person Name'}
              metaTitle={'Browse by Person'}
            />}
            />
            <Route exact path='/browse-letters-place' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType={'place'}
              placeholder={"ex. 'Paris'"}
              tableHeader={'Place Name'}
              metaTitle={'Browse by Places'}
            />}
            />
            <Route exact path='/browse-letters-production' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='production'
              placeholder={"ex. 'Krapp's Last Tape'"}
              tableHeader={'Production Name'}
              metaTitle={'Browse by Productions'}
            />}
            />
            <Route exact path='/browse-letters-public-event' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='public-event'
              placeholder={"ex. 'Bastille Day'"}
              tableHeader={'Public Event'}
              metaTitle={'Browse by Public Events'}
            />}
            />
            <Route exact path='/browse-letters-publication' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='publication'
              placeholder={"ex. 'Godot'"}
              tableHeader={'Publication Name'}
              metaTitle={'Browse By Publication'}
            />}
            />
            <Route exact path='/browse-letters-reading' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='reading'
              placeholder={"ex. 'The Warden'"}
              tableHeader={'Reading Name'}
              metaTitle={'Browse by Reading'}
            />}
            />
            <Route exact path="/browse-letters-repositories" render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='repositories'
              placeholder={"ex. 'Trinity College'"}
              tableHeader={'Repository'}
              metaTitle={'Browse by Repositories'}
            />}
            />
            <Route exact path='/browse-letters-translating' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='Translating'
              placeholder={"ex. 'Krapp'"}
              tableHeader={'Translating Title'}
              metaTitle={'Browse by Translating'}
            />}
            />
            <Route exact path='/browse-letters-work-of-art' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='work-of-art'
              placeholder={"ex. 'Divine Comedy'"}
              tableHeader={'Work of Art Title'}
              metaTitle={'Browse by Work of Art'}
            />}
            />
            <Route exact path='/browse-letters-writing' render={(props) => <LettersBy apiUrl={this.props.apiUrl} {...props}
              entityType='writing'
              placeholder={"ex. 'Molloy'"}
              tableHeader={'Writing Title'}
              metaTitle={'Browse by Writing'}
            />}
            />
            {/* Entity Details: */}
            <Route exact path='/attendance/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/music/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/organization/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path="/people/:id" render={(props) => <PersonDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/place/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/production/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/public-event/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/publication/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/reading/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/repositories/:id' render={(props) => <RepositoryDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/translating/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/work-of-art/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/writing/:id' render={(props) => <EntityDetails apiUrl={this.props.apiUrl} {...props} />} />
            {/* etc: */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/letters/letterdetails/:id" render={(props) => <LetterDetails apiUrl={this.props.apiUrl} {...props} />} />
            <Route exact path='/timeline' component={Timeline} />
            <Route exact path='/filter-search' component={FilterSearch} />
          </Switch>
        </Container>
      </Router>
    );
  }

}

export default App;
