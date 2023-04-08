import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries';

const BookDetails = ({ id }) => {
    const [getBook, { loading, error, data }] = useLazyQuery(GET_BOOK);

    useEffect(() => {
        if (id) {
            getBook({ variables: { id: id } });
        }
    }, [id]);

    const renderedBooks = data?.book.author.books.map((book) => {
        return <li>. {book.name}</li>;
    });

    return (
        <div className="flex flex-col gap-1 border p-2">
            {}
            <h1 className="font-bold text-2xl">Book Details</h1>
            <br />
            <h1>Title: {data?.book.name}</h1>
            <p>Genre: {data?.book.genre}</p>
            <p>Author: {data?.book.author.name}</p>

            <ul>
                <p className="font-semibold">Other books</p>
                {renderedBooks}
            </ul>
        </div>
    );
};

export default BookDetails;
