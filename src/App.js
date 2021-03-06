import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchPage from "./components/searchPage";
import MainPage from "./components/mainPage";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    bookShelves: {
      currentlyReading: {
        shelveName: "Currently Reading",
        books: [],
        id: "currentlyReading",
      },
      wantToRead: { shelveName: "Want to Read", books: [], id: "wantToRead" },
      read: { shelveName: "Read", books: [], id: "read" },
    },
    options: {
      currentlyReading: { label: "Currently Reading", id: "currentlyReading" },
      wantToRead: { label: "Want to Read", id: "wantToRead" },
      read: { label: "Read", id: "read" },
      none: { label: "None", id: "none" },
    },
    allBooks: [],
  };

  /**
   * function to move book from one book shelve to the other
   * @param {*} event
   * it will get element id and clicked value from the click event
   * conditional statement for the various values
   *  if true add the new element id  to the array and filter the previous element based on id
   *
   */
  moveBook = (bookShelf, e, book) => {
    let value = e.target.value;

    this.removeBook(book, bookShelf, value);

    this.addBook(value, book);
    this.updateBook(book, value);
  };

  /**
   * function to call the update api
   * it will accept the bookid and shelve name as arguement
   */
  updateBook(bookId, shelveName) {
    return BooksAPI.update(bookId, shelveName);
  }
  addBook(value, newElem) {
    if (value === "currentlyReading") {
      return this.setState((previousState) => {
        let bookShelves = Object.assign({}, previousState.bookShelves);
        bookShelves.currentlyReading.books = previousState.bookShelves.currentlyReading.books.concat(
          newElem
        );
        return { bookShelves };
      });
    } else if (value === "wantToRead") {
      return this.setState((previousState) => {
        let bookShelves = Object.assign({}, previousState.bookShelves);
        bookShelves.wantToRead.books = previousState.bookShelves.wantToRead.books.concat(
          newElem
        );
        return { bookShelves };
      });
    } else if (value === "read") {
      return this.setState((previousState) => {
        let bookShelves = Object.assign({}, previousState.bookShelves);
        bookShelves.read.books = previousState.bookShelves.read.books.concat(
          newElem
        );
        return { bookShelves };
      });
    }
  }
  /**
   * removeBook is a function used to remove the selected books from its current bookshelve
   * @param {object for the book selected} singleElem
   * @param {object for the bookshelve selected} bigElem
   * @param {objet for the selected options from each book} value
   */
  removeBook(singleElem, bigElem, value) {
    if (bigElem.id === "currentlyReading" && value !== "none") {
      return this.setState((previousState) => {
        let bookShelves = Object.assign({}, previousState.bookShelves);
        bookShelves.currentlyReading.books = previousState.bookShelves.currentlyReading.books.filter(
          (elem) => {
            return elem.id !== singleElem.id;
          }
        );
        return { bookShelves };
      });
    } else if (bigElem.id === "wantToRead" && value !== "none") {
      return this.setState((previousState) => {
        let bookShelves = Object.assign({}, previousState.bookShelves);
        bookShelves.wantToRead.books = previousState.bookShelves.wantToRead.books.filter(
          (elem) => {
            return elem.id !== singleElem.id;
          }
        );
        return { bookShelves };
      });
    } else if (bigElem.id === "read" && value !== "none") {
      return this.setState((previousState) => {
        let bookShelves = Object.assign({}, previousState.bookShelves);
        bookShelves.read.books = previousState.bookShelves.read.books.filter(
          (elem) => {
            return elem.id !== singleElem.id;
          }
        );
        return { bookShelves };
      });
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      return this.setState(() => ({
        allBooks: res,
        bookShelves: {
          currentlyReading: {
            shelveName: "Currently Reading",
            books: [
              ...new Set(
                res.filter(
                  (bookValue) => bookValue.shelf === "currentlyReading"
                )
              ),
            ],
            id: "currentlyReading",
          },
          wantToRead: {
            shelveName: "Want to Read",
            books: [
              ...new Set(
                res.filter((bookValue) => bookValue.shelf === "wantToRead")
              ),
            ],
            id: "wantToRead",
          },
          read: {
            shelveName: "Read",
            books: [
              ...new Set(res.filter((bookValue) => bookValue.shelf === "read")),
            ],
            id: "read",
          },
        },
      }));
    });
  }

  render() {
    const { bookShelves, options } = this.state;

    return (
      <div className="app">
        <Route
          path="/searchPage"
          render={() => {
            return (
              <SearchPage
                options={options}
                bookShelves={bookShelves}
                moveBook={this.moveBook}
              />
            );
          }}
        />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                <MainPage
                  bookShelves={this.state.bookShelves}
                  options={options}
                  moveBook={this.moveBook}
                />
                <footer>Developed by Oyewole Oluwatobi</footer>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
export default BooksApp;
