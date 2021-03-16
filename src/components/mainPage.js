import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainPage extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.values(this.props.bookShelves).map((book, index) => {
              return (
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{book.shelveName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {book.books.map((img, index) => {
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
                                      img.imageLinks.smallThumbnail
                                    })`,
                                  }}
                                />

                                <div className="book-shelf-changer">
                                  <select
                                    onChange={(e) => {
                                      return this.props.moveBook(book, e, img);
                                    }}
                                    defaultValue={book.id}
                                  >
                                    <option value="move" disabled>
                                      Move to...
                                    </option>
                                    {Object.values(this.props.options).map(
                                      (elem) => {
                                        return (
                                          <option value={elem.id} key={elem.id}>
                                            {" "}
                                            {elem.label}{" "}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{img.title}</div>
                              <div className="book-authors">
                                {img.authors[0]}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/searchPage">
            <button />
          </Link>
        </div>
      </div>
    );
  }
}

export default MainPage;
