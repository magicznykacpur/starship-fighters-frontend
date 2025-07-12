# Starship Fighters

A simple React + Vite app that retrieves data from a graphql endpoint, and then
lets the user choose a `card type`, pick two cards, choose a `resource type`
to fight against and then star battle between the cards.

The card with higher attribute wins. The game supports single player and two player modes.

## How to run

In order to run the application you need to:

- create a `.env` file with `VITE_API_URL` variable, the default api exposed for
  this front-end is usually available at `"http://localhost:3000/api"` so that's what you can set it to

- run `npm install` in order to install all the required packages

- run `npm run dev` - the app will start on `localhost:5173`

## Testing

To run test simply run `npm run test` in your terminal. The app uses Jest and
react-testing library for testing
