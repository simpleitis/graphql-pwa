import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = ({ selectedBookId, setSelectedBookId }) => {

    const { loading, error, data } = useQuery(GET_BOOKS);

    let renderedBooks = data?.books.map(({ id, name, genre }) => (
        <div key={id} onClick={() => setSelectedBookId(id)}>
            <h3>{name}</h3>
            <p>{genre}</p>
            <br />
        </div>
    ));

    return (
        <div className="flex gap-10 border p-2">
            <div>{loading ? <p>Loading...</p> : renderedBooks}</div>
        </div>
    );
};

export default BookList;
