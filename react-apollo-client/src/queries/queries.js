import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
    query GetBooks {
        books {
            id
            name
            genre
        }
    }
`;

export const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
        }
    }
`;

export const ADD_BOOK = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name
            genre
        }
    }
`;

export const GET_BOOK = gql`
    query GetBook($id: ID!) {
        book(id: $id) {
            name
            genre
            author {
                name
                age
                books {
                    name
                }
            }
        }
    }
`;
