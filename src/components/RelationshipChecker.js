import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RelationshipCard from './RelationshipCard';
import { Button, Col, Row, Card } from 'react-bootstrap';

class RelationshipChecker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            relationshipData: []
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://ot-api.ecdsdev.org/' + this.props.URLextender + this.props.id)])
            .then(axios.spread((getrelationshipData) => {
                const relationshipData = getrelationshipData.data;
                this.setState({ relationshipData });
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
            if (this.props.cardType === 'entities') {
                if (this.state.relationshipData.data.attributes['type-label'] === 'Place')
                    return (
                        <Row>
                            <Col md="auto">
                                <Card className='relationship-card'>
                                    <Card.Header><h5>{this.state.relationshipData.data.attributes.label}</h5></Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            card text
                                        </Card.Text>
                                        <Button to='#'>Explore</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
            // Recipients type
            if (this.props.cardType === 'recipients') {
                return (
                    <Row>
                        <Col md="auto">
                            <Card className='relationship-card'>
                                <Card.Header><h5>{this.state.relationshipData.data.attributes.label}</h5></Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        card text
                                    </Card.Text>
                                    <Button to='#'>Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            }
            // Repositories type
            if (this.props.cardType === 'repositories') {
                return (
                    <Row>
                        <Col md="auto">
                            <Card className='relationship-card'>
                                <Card.Header><h5>{this.state.relationshipData.data.attributes.label}</h5></Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        card text
                                    </Card.Text>
                                    <Button to='#'>Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            }
            // Places written type
            if (this.props.cardType === 'places-written') {
                return (
                    <Row>
                        <Col md="auto">
                            <Card className='relationship-card'>
                                <Card.Header><h5>{this.state.relationshipData.data.attributes.label}</h5></Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        card text
                                    </Card.Text>
                                    <Button to='#'>Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            }

            else {
                return (
                    <Row>
                        <Col md="auto">
                            <Card className='relationship-card'>
                                <Card.Header><h5>{this.props.cardType}</h5></Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        card body
                                    </Card.Text>
                                    <Button to='#'>Explore</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            }



        }
    }
}

export default RelationshipChecker;
