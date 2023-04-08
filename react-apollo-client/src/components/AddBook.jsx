import { useMutation, useQuery } from '@apollo/client';
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries/queries';
import { useState, useEffect } from 'react';

const AddBook = () => {
    const [name, setName] = useState();
    const [genre, setGenre] = useState();
    const [authorId, setAuthorId] = useState();

    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [addBook, { data: mdata, loading: mloading, error: merror }] =
        useMutation(ADD_BOOK, {
            refetchQueries: [
                { query: GET_BOOKS }, // DocumentNode object parsed with gql
                'GetBooks', // Query name
            ],
        });

    useEffect(() => {
        setAuthorId(data?.authors[0].id);
    }, [data]);

    let displayAuthors = data?.authors?.map((author) => {
        return (
            <option key={author.id} value={author.id}>
                {author.name}
            </option>
        );
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        addBook({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId,
            },
        });

        setName('');
        setGenre('');
        setAuthorId('');
    };

    return (
        <form
            id="add-book"
            className="p-2 border rounded-md"
            onSubmit={(e) => handleSubmit(e)}
        >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="p-2">
                        <label>Book Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="p-2">
                        <label>Genre:</label>
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div className="p-2">
                        <label>Author:</label>
                        <select
                            className="border ml-2"
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
                        >
                            {displayAuthors}
                        </select>
                    </div>
                    <button className="p-2 border rounded-md bg-blue-500 w-full text-white">
                        +
                    </button>
                </>
            )}
        </form>
    );
};

export default AddBook;
