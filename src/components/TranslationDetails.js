import axios from 'axios';
import DocMetaBuilder from './utilities/DocMetaBuilder';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

class TranslationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: [],
      lettersList: []
    }
  }


  componentDidMount() {
    this.getData()
  }


  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl + '/entities/' + this.props.match.params.id)])
      .then(axios.spread((getData) => {
        const entityData = getData.data.data;
        this.setState({ entityData });
        this.setState({ isLoaded: true })
      }))
      .catch((err) => {
        this.setState({ isLoaded: false });
        this.setState({ error: err.message });
      });
  }



  render() {
    const { error, isLoaded } = this.state;
    // if there is an error
    if (error) {
      return <div>Error: {error.message}</div>;
      // if not loaded show loading
    } else if (!isLoaded) {
      return <div>Loading...</div>;
      // return now that component has value
    } else {
      const metaBuild = {
        title: this.state.entityData.attributes.label,
        description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties['translated-into']}`,
        id: this.state.entityData.id
      };
      return (
        <div className="details">
          <DocMetaBuilder {...metaBuild} />
          {this.state.entityData.attributes.label ? <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> : <h1>{this.state.entityData.id}</h1>}
          <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Author</td>
                <td>{this.state.entityData.attributes.properties.author}</td>
              </tr>
              <tr>
                <td>Comments</td>
                <td>{this.state.entityData.attributes.properties.comments}</td>
              </tr>
              <tr>
                <td>Translated Into</td>
                <td>{this.state.entityData.attributes.properties['translated-into']}</td>
              </tr>
              <tr>
                <td>Translated Title</td>
                <td dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.properties['translated-title'] }}></td>
              </tr>
              <tr>
                <td>Translator</td>
                <td>{this.state.entityData.attributes.properties.translator}</td>
              </tr>
            </tbody>
          </table>
          <h2>Mentioned In:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div>
      )
    }
  }
}

export default TranslationDetails;
