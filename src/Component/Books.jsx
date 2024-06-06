import React, { Component } from "react";
import {
  AppBar,
  Card,
  CardContent,
  Box,
  CardMedia,
  Toolbar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import RegisterForm from "./RegisterForm";
class Books extends Component {
  constructor(props) {
    super(props);

    this.state = { books: [], search: "", openForm: false };
  }
  componentDidMount() {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((res) => this.setState({ books: res.data.books }))
      .catch((err) => console.log(err));
  }
  handleSearch = (event) => {
    this.setState({ search: event.target.value });
  };
  render() {
    const { books, search, openForm } = this.state;
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    if (openForm) {
      return <RegisterForm />;
    }
    return (
      <div className="bg">
        {/*  navbar */}
        <AppBar position="static" sx={{ bgcolor: "rgb(197, 119, 119)" }}>
          <Toolbar>
            <img src="https://kalvium.community/images/sidebar-3d-logo.svg" />
            <Typography
              variant="h6"
              sx={{
                width: "10rem",
                marginLeft: ".5rem",
                color: "rgb(216, 0, 0)",
                textShadow: "2px 2px 3px rgba(0, 0, 0.5)",
              }}
            >
              <strong> Kalvium Books</strong>
            </Typography>
            <TextField
              sx={{
                width: "20rem",
                marginLeft: "2rem",
                "&:hover": {
                  border: "3px solid rgb(197, 119, 119)",
                },
              }}
              variant="outlined"
              placeholder="Search Books"
              onChange={this.handleSearch}
              size="small"
            />
            <Button
              variant="contained"
              onClick={() => this.setState({ openForm: true })}
              sx={{
                color: "white",
                bgcolor: "rgb(197, 119, 119)",
                marginLeft: "50rem",
                border: "3px solid rgb(216, 0, 0)",
                borderRadius: "0.25rem",
                "&:hover": {
                  bgcolor: "rgb(216, 0, 0)",
                  border: "3px solid rgb(197, 119, 119)",
                },
              }}
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>
        {/* Books part */}
        <div>
          {books.length > 0 ? (
            <Grid sx={{ padding: "100px" }} container spacing={5}>
              {filteredBooks.map((book) => (
                <Grid sx={{ margin: "10px", border: "2px" }} item key={book.id}>
                  <Box>
                    <Card variant="outlined" sx={{ width: "15rem" }}>
                      <CardMedia
                        component="img"
                        alt={book.title}
                        src={book.imageLinks.smallThumbnail}
                      />
                      <CardContent>{book.title}</CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No books found</Typography>
          )}
        </div>
      </div>
    );
  }
}

export default Books;
