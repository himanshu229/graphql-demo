// src/App.js
import { ApolloProvider } from "@apollo/client";
import React from "react";
import client from "./apollo";

import AllBooks from "./components/AllBooks";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AllBooks />
      {/* <div className="App">
        <h1>GraphQL React App</h1>
        <BookList />
        <AddBook />
      </div> */}
    </ApolloProvider>
  );
};

export default App;
