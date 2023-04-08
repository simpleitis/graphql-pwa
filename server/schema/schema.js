const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // the reason why we are using a function to define the fields is because is we had just passed an object then there would be undefined errors. If we take the case of "AuthorType" we are accessing "BookType" which is defined after "AuthorType" is defined so accessing "BookType" would give an undefined error but if we wrap this inside a function the function won't run from the start and by the time the function is to be run all the variable would have valid references
    fields: () => ({
        // GraphQLID can accept number and strings and converts it into string
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id });
            },
        },
    }),
});
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        // GraphQLID can accept number and strings and converts it into string
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId);
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // defining one of the entry point
        book: {
            type: BookType,
            // mandatory argument to find the book
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db
                // return _.find(books, { id: args.id });
                return Book.findById(args.id);
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id });
                return Author.findById(args.id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },

            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });
                // returning the result of "author.save()"
                return author.save();
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },

            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                });
                // returning the result of "author.save()"
                return book.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
