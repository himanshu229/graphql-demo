import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  bookName: Yup.string().required("Book name is required"),
  subject: Yup.string().required("Subject is required"),
  authorName: Yup.string().required("Author name is required"),
});

const ADD_BOOK = gql`
  mutation AddBook(
    $bookName: String!
    $authorName: String!
    $subject: String!
  ) {
    addBook(bookName: $bookName, authorName: $authorName, subject: $subject) {
      id
      bookName
      authorName
      subject
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UPDATE_BOOK(
    $id: String!
    $bookName: String!
    $authorName: String!
    $subject: String!
  ) {
    updateauthorName(
      id: $id
      bookName: $bookName
      authorName: $authorName
      subject: $subject
    ) {
      id
      bookName
      authorName
      subject
    }
  }
`;

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

const AddBook = (props) => {
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refetch GET_BOOKS query after successful mutation
  });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refetch GET_BOOKS query after successful mutation
  });

  const [open, setOpen] = React.useState(false);
  const initialValues = {
    bookName: props?.editData?.bookName ?? "",
    subject: props?.editData?.subject ?? "",
    authorName: props?.editData?.authorName ?? "",
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    if (props.edit) {
      updateBook({ variables: { ...values, id: props?.editData?.id } });
      handleClose()
    } else {
      addBook({ variables: values });
      handleClose()
    }
    if (!props.edit) {
      resetForm();
    }
  };

  return (
    <div>
      {props.edit ? (
        <Button onClick={handleClickOpen}>Edit</Button>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Books
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} p={6}>
        <Box mt={2} mr={5} ml={5} mb={2}>
          <DialogTitle>Add Book</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <Field
                      name="bookName"
                      label="Book Name"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="bookName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div>
                    <Field
                      name="authorName"
                      label="Author Name"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="authorName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div>
                    <Field
                      name="subject"
                      label="Subject"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="error"
                    />
                  </div>
                  <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddBook;
