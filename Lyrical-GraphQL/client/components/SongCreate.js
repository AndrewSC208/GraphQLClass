import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: ''
        }
    }

    onSubmit(event) {
        const { title } = this.state;
        event.preventDefault();

        this.props.mutate({
            variables: { title },
            refetchQueries: [{ query: fetchSongs  }]
        }).then(() => hashHistory.push('/'))
        // use .catch(() => {}) to handle server validation
    };

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={event => this.onSubmit(event)}>
                    <label>Song Title:</label>
                    <input 
                        onChange={event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);