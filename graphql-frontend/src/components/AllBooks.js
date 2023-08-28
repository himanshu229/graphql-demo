import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default AllBooks;
