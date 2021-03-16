import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends Component {
  state = {
    query: "",
    searchResult: [],
    defaultValue: "none",
  };
  updateQuerry = (event) => {
    this.setState({ query: event });
  };

  search(query) {
    BooksAPI.search(query)
      .then((resp) => {
        if (resp.error) {
          this.setState({ searchResult: [] });
        } else {
          this.setState({ searchResult: resp });
        }
      })
      .catch();
  }

  bookCheck(currentlyReading, wantToRead, read, searchElement) {
    if (
      this.props.bookShelves[`${currentlyReading}`] &&
      this.props.bookShelves[`${wantToRead}`] &&
      this.props.bookShelves[`${read}`]
    ) {
      const currentReadingFilteredResult = this.props.bookShelves[
        `${currentlyReading}`
      ].books.filter((bookValue) => bookValue.id === searchElement.id);

      const wantToReadFilteredResult = this.props.bookShelves[
        `${wantToRead}`
      ].books.filter((bookValue) => bookValue.id === searchElement.id);

      const readFilteredResult = this.props.bookShelves[`${read}`].books.filter(
        (bookValue) => bookValue.id === searchElement.id
      );

      if (currentReadingFilteredResult.length) {
        currentReadingFilteredResult.map(
          (currentReadingResult) =>
            (currentReadingResult.shelf = "currentlyReading")
        );
        return "currentlyReading";
      } else if (wantToReadFilteredResult.length) {
        wantToReadFilteredResult.map(
          (wanttReadResult) => (wanttReadResult.shelf = "wantToRead")
        );
        return "wantToRead";
      } else if (readFilteredResult.length) {
        readFilteredResult.map((readResult) => (readResult.shelf = "read"));
        return "read";
      } else {
        return "none";
      }
    }
  }

  render() {
    const { searchResult, query } = this.state;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => {
                  this.updateQuerry(event.target.value);
                  if (event.target.value) {
                    this.search(event.target.value);
                  }
                }}
                value={query}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.props.searchResult !== [] ? (
                searchResult.map((searchElement, index) => {
                  return (
                    <li key={index}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                searchElement.imageLinks
                                  ? searchElement.imageLinks.smallThumbnail
                                  : ``
                              })`,
                            }}
                          />

                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) => {
                                return this.props.moveBook(
                                  [],
                                  e,
                                  searchElement
                                );
                              }}
                              defaultValue={this.bookCheck(
                                "currentlyReading",
                                "wantToRead",
                                "read",
                                searchElement
                              )}
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              {Object.values(this.props.options).map((elem) => {
                                return (
                                  <option value={elem.id} key={elem.id}>
                                    {" "}
                                    {elem.label}{" "}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{searchElement.title}</div>
                        <div className="book-authors">
                          {searchElement.authors
                            ? searchElement.authors[0]
                            : ``}
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : searchResult === [] ? (
                <p>result not found</p>
              ) : (
                ``
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
