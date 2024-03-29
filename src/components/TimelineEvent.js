import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class TimelineEvent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        imageError: false,
    };
}

  showNull(e) {
    this.setState({
      imageError: true
    })
  }

  render() {
    const eventClassName = (() => {
      if (this.props.event.type === 'global')
        return 'event offset-md-6 right-event'
      else
        return 'event left-event'
    })();

    return (
      <Row>
        <Col md={6} className={eventClassName}>
          <div className={this.props.event.type}>
            <h4>{this.props.event.date}</h4>
            <p><span dangerouslySetInnerHTML={{ __html: this.props.event.event }} /></p>
            {this.state.imageError ? null : <img className='timeline-event-image' src={this.props.event.additional} alt='timeline event' onError={(e) => this.showNull(e)} />}
          </div>
        </Col>
      </Row>
    )

  }
}

export default TimelineEvent;
