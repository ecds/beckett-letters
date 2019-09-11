import React, { Component } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { nullLiteral } from '@babel/types';

class entitiesRelationship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            personData: []
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/entities/' + this.props.personId)])
            .then(axios.spread((getPersonData) => {
                const personData = getPersonData.data;
                this.setState({ personData });
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
            let cardText = null;
            if (this.state.personData.data.attributes.properties != null) {
                cardText = this.state.personData.data.attributes.properties.description
            }

            return (
                <Row>
                    <Col md="auto">
                        <Card className='entitiesRelationship-card'>
                            <Card.Header><h5>{this.state.personData.data.attributes["label"]}</h5></Card.Header>
                            <Card.Body>
                                <Row>
                                    <Card.Img src={this.state.personData.data.attributes.properties.media.images["0"].link} className='entitiesRelationship-card-img' />                                    <Col>
                                        <Card.Text>
                                            {cardText}
                                        </Card.Text>

                                        <Button to={'/people/' + this.state.personData.id}>
                                            Explore
                                    </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        }
    }
}

export default entitiesRelationship;
