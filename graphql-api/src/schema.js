// schema.js
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const BookList = require("../module");

// Sample data
const books = [
  {
    id: "1",
    bookName: "Book 1",
    authorName: "authorName 1",
    subject: "subject",
  },
  {
    id: "2",
    bookName: "Book 2",
    authorName: "authorName 2",
    subject: "subject",
  },
];

// Define Book type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    bookName: { type: GraphQLString },
    authorName: { type: GraphQLString },
    subject: { type: GraphQLString },
  }),
});

// Define root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return books.find((book) => book.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve() {
        const book = await BookList.find();
        return book;
      },
    },
  },
});

// Define mutations for CRUD operations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        bookName: { type: new GraphQLNonNull(GraphQLString) },
        authorName: { type: new GraphQLNonNull(GraphQLString) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const bookList = new BookList({
          bookName: args.bookName,
          authorName: args.authorName,
          subject: args.subject,
        });
        const books = await bookList.save();
        return {
          id: books._id,
          bookName: books.bookName,
          authorName: books.authorName,
          subject: books.subject,
        };
      },
    },
    updateauthorName: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        bookName: { type: new GraphQLNonNull(GraphQLString) },
        authorName: { type: new GraphQLNonNull(GraphQLString) },
        subject: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const books = await BookList.find();
        const index = books.findIndex((book) => book.id === args.id);
        const options = {
          new: true,
          upsert: true,
          returnOriginal: false, // This ensures that the updated document is returned
        };
        await BookList.findByIdAndUpdate(
          { _id: args.id },
          {
            bookName: args.bookName,
            authorName: args.authorName,
            subject: args.subject,
          },
          options
        );
        if (index !== -1) {
          books[index] = {
            ...books[index],
            bookName: args.bookName,
            authorName: args.authorName,
            subject: args.subject,
          };
          return books[index];
        } else {
          throw new Error("Book not found.");
        }
      },
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        await BookList.deleteMany({ _id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
