import React, { Component } from "react";
import { Link } from "react-router-dom";

class MentionedLetters extends Component {
    render() {
        if (this.props.letters.length === 0) {
            return (
                <tbody>
                    <tr>
                        <td>No Letters</td>
                        <td></td>
                    </tr>
                </tbody>
            )
        }
        else {
            return (
                <tbody>
                    {this.props.letters.map((letter) =>
                        <tr key={letter.id}>
                            <td>{letter['recipients'].map((this_recipient) => <a key={this_recipient.id} href={'/people/' + this_recipient.id + '/' + this_recipient.name}>{this_recipient.name}</a>)}</td>
                            <td>{letter.date}</td>
                            <td className="actions"><Link to={'/letters/letterdetails/' + letter.id}>View Letter Details</Link></td>
                        </tr>
                    )}
                </tbody>
            )
        }
    }
}

export default MentionedLetters;
