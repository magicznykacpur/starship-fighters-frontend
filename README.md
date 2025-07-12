# Starship Fighters

A simple React + Vite app that retrieves data from a graphql endpoint, and then
lets the user choose a `card type`, pick two cards, choose a `resource type`
to fight against and then star battle between the cards.

The card with higher attribute wins. The game supports single player and two player modes.

Since this is a demo I've added .env file to the repo for simplicity.

## How to run

Project was developed using `node v24.0.0` so please use this version or above
when installing dependencies and running tests.

In order to run the application you need to:

- run `npm install` in order to install all the required packages

- run `npm run dev` - the app will start on `localhost:5173`

## Testing

To run test simply run `npm run test` in your terminal. The app uses Jest and
react-testing library for testing.
