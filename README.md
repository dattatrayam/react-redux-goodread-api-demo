# **React-Redux-Redux-ThBook-Search Demo**

This application is developed using React and Redux together. 
Redux Thunk middleware is used for asynchronous actions to call goodreads remote API.

This project was bootstrapped with `create-react-app` and deployed live at https://react-redux-goodread-app.herokuapp.com/

# Running application locally

**Prerequisites:** You need to have Node + NPM installed.

**Clone the repo:**

    git clone https://github.com/dattatrayam/react-redux-goodread-api-demo.git

**Install required dependencies:**

    npm install

**Starting the application:**

    npm start

# Building the application:

    npm run build

# Testing the App:
    npm test

# Features :
1. Able to search book with name using GoodReads Search API and display result in list
2. Clicking on book item in list it show book details, ratings, description of the book

## UI Component Hierarchy
There are three components in app:
1. SearchComponent -  Receive user input as search text
2. BookListComponent - Dispaly data collection based on user input and search API result
3. DetailBookComponent - Dispaly selected book detail view with ratings, description,etc

# Future Implementation:
I want to add below things in the future version:
1. Add Redux-Saga middleware for asynchronous actions
2. Refactoring of Reducer and create reducer for each UI component and use combinedreducer to use them
3. Add UI test cases
