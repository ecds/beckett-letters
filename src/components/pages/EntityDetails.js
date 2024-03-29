import axios from 'axios';
import DocMetaBuilder from '../utilities/DocMetaBuilder';
import HeaderBuilder from '../utilities/HeaderBuilder';
import SubheaderBuilder from '../utilities/SubheaderBuilder';
import MentionedLetters from '../utilities/MentionedLettersTable';
import React, { Component } from 'react';

class EntityDetails extends Component {
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
            axios.get(this.props.apiUrl + '/entities/' + this.props.match.params.id)])
            .then(axios.spread((getData) => {
                const entityData = getData.data.data;
                console.log(entityData);
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
            let metaBuild = {
                title: this.state.entityData.attributes.label,
                description: `${this.state.entityData.attributes.label} ${this.state.entityData.attributes.properties['place-date']}`,
                id: this.state.entityData.id
            }
            return (
                <div className="details entity-header">
                    <DocMetaBuilder {...metaBuild} />
                    <HeaderBuilder entityData={this.state.entityData} />
                    <SubheaderBuilder entityData={this.state.entityData} />
                    <h3>Mentioned In:</h3>
                    <MentionedLetters letters={this.state.entityData.attributes['public-letters-hash']} />
                </div >
            )
        }
    }
}

export default EntityDetails;