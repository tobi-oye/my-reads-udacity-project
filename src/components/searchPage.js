import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class SearchPage extends Component {
  state = {
    query: "",
    searchResult: [],
  };
  updateQuerry = (event) => {
    this.setState({ query: event });
  };

  search(query) {
    BooksAPI.search(query)
      .then((res) => {
        if (res.error) {
          this.setState({ searchResult: [] });
        } else {
          return this.setState({ searchResult: res });
        }
      })
      .catch(console.log("err"));
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
              {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                searchResult.map((searchElem) => {
                  return (
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                searchElem.imageLinks
                                  ? searchElem.imageLinks.smallThumbnail
                                  : ``
                              })`,
                            }}
                          />

                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) => {
                                return this.props.moveBook([], e, searchElem);
                              }}
                              defaultValue="none"
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
                        <div className="book-title">{searchElem.title}</div>
                        <div className="book-authors">
                          {searchElem.authors ? searchElem.authors[0] : ``}
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
