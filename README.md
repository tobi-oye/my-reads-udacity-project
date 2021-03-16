# My Reads Book Tracking App

Book Tracking Application that enables users to move books from one shelf to the other. There are three shelves in total namely:
- Currently Reading
- Want to Read
- Read

Furthermore, users will have the ability to search for new books and can move them to the shelves stated above. Also, you get to know if books from the search section have been added to any of the bookshelves in the main section.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
Clone the repository, change directories, and use NPM to install the dependencies.
- Clone/Download this repo.
- Run `npm install`or `yarn install` in the project directory to install dependencies.
- The project can be run with `npm start`
- Then it can be viewed in the browser at [http://localhost:3000](http://localhost:3000)
### Prerequisites

In order to run this application, you'll first need to download the below files or clone this repository to get started. The app is built using the React library, so you'll also need to run `npm install` on your terminal while in the project directory to install all project dependencies. Finally, you'll need to run `npm start` in the project directory in order to start the server.

Files that must be downloaded from this repository to run this application include:
1. `src` directory
   * All included CSS, page icons, and JS - including React components
2. `public` directory
   * Root HTML (`index.html`) and React icon for page
3. `package.json` (NPM package manager file)
```
```

### Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) contains following methods to perform necessary operations on the backend:

* `getAll` To get all the books from the API
* `update` Update shelf information of the book
* `search` Search book in the database

## Built With

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Authors

* Udacity Team and ME--> **Oyewole Oluwaatobi** - - [tobi-oye](https://github.com/tobi-oye)


## Acknowledgments

* Hat tip to the Udacity team for the challenge

## NOTE
The backend API is built by Udacity and **only a fixed set of search terms are supported.** Supported search terms can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the API.