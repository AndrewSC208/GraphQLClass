import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';
/*
 *  GRAPHQL + REACT STRATEGY
 *  1. Identify data required
 *  2. Write query in Graphical (for practice) and in component file
 *  3. Bond query + component
 *  4. Access data!
 */
class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    {title}
                    <i className="material-icons" onClick={() => this.onSongDelete(id)}>
                        delete
                    </i>
                </li>
            )
        })
    }

    render() {
        if (this.props.data.loading) { return <div>Loading...</div>; }

        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right">
                        <i className="material-icons">add</i>
                    </Link>
            </div>
        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation) (
    graphql(fetchSongs)(SongList)
);