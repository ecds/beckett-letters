import axios from 'axios';
import DocumentMeta from 'react-document-meta';
import MentionedLetters from './utilities/MentionedLettersTable';
import React, { Component } from 'react';

let striptags = require('striptags');

class WorksOfArtDetails extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: '',
      entityData: []
    }
  }


  componentDidMount() {
    this.getData()
  }


  getData = () => {
    axios.all([
      axios.get(this.props.apiUrl+'/entities/'+this.props.match.params.id)])
      .then(axios.spread((getData) => {
        const entityData = getData.data.data;
        console.log(entityData)
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
      let strippedTitle
      if (this.state.entityData.attributes.label) {
        strippedTitle = striptags(this.state.entityData.attributes.label)
      }
      else {
        strippedTitle = this.state.entityData.id
      }
      const meta = {
        title: strippedTitle,
        description: `View details for ${strippedTitle}`,
      };
      return (
        <div className="details">
          <DocumentMeta {...meta} />
          {this.state.entityData.attributes.label ? <h1 dangerouslySetInnerHTML={{ __html: this.state.entityData.attributes.label }} /> : <h1>{this.state.entityData.id}</h1>}

          <table className="table table-striped">
            <tbody className='details-table'>
              <tr>
                <td>Artist</td>
                <td>{this.state.entityData.attributes.properties.artist}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{this.state.entityData.attributes.properties.location}</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>{this.state.entityData.attributes.properties.owner}</td>
              </tr>
            </tbody>
          </table>
          <h2>Mentioned In:</h2>
          <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
        </div >
      )
    }
  }
}

export default WorksOfArtDetails;
