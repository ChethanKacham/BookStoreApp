# Book Store Application

## Overview
The Book Store Application is a web-based project developed using ReactJS that allows users to manage their book collections. It features functionality to create, read, update, and delete (CRUD) book records, all stored in an in-memory `books.json` data file.

## Features
- **User Interface:** A responsive and intuitive UI built with ReactJS.
- **CRUD Operations:** Allows users to add, view, update, and delete books.
- **In-Memory Data Storage:** Uses a `books.json` file to store book data.

## Technologies Used
- **Frontend:** ReactJS, HTML, CSS, JavaScript
- **Data Storage:** `books.json` file for in-memory storage

## Getting Started

### Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/ChethanKacham/BookStoreApp.git
    ```
2. Navigate to the project directory:
    ```sh
    cd BookStoreApp
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application
1. Watch the `books.json`:
    ```sh
    json-server --watch src/books.json --port 3005
    ```
2. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Functionalities
- **Add Book:** Users can add new books by filling out a form.
- **View Books:** Users can see a list of all books with details.
- **Update Book:** Users can update details of existing books.
- **Delete Book:** Users can remove books from the collection.

## Contact
- **Name:** Chethan Kacham
- **Email:** [chethankacham06@gmail.com](mailto:chethankacham06@gmail.com)