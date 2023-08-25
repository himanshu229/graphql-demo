import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import AddBook from "./AddBook";
import DataTable from "./DataTable";

const GET_BOOKS = gql`
  query {
    books {
      id
      bookName
      authorName
      subject
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

const AllBooks = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleDelete = async (id) => {
    try {
      await deleteBook({ variables: { id } });
      refetch();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };


  return (
    <>
      <Box sx={{ justifyContent: "center", textAlign: "center" }}>
        <Typography component={"h1"} sx={{ fontSize: "2rem", color: "blue" }}>
          Book List of Subject
        </Typography>
      </Box>
      <Box
        mt={4}
        sx={{ display: "flex", justifyContent: "center", gap: "88px" }}
      >
        <AddBook edit={false} />
      </Box>
      <Divider sx={{ margin: "30px" }} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <p>Loading Books List....</p>
        ) : !!error ? (
          <p>{error}</p>
        ) : (
          <Box sx={{ width: "80%" }}>
            <DataTable
              data={data?.books}
              onDelete={handleDelete}
              handleChangePage={(e) => {}}
              handleChangeRowsPerPage={(e) => {}}
              rowsPerPage={0}
              page={0}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default AllBooks;
