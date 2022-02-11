# Fujiji Server

Backend/Server application for Fujiji build using Node.js, Express, and Azure SQL

Using AirBnb linting and code style

# Getting Started

Create `.env` file:
```
cp .env.sample .env
```

Install dependencies:

```
npm install
```

Run the application:

```
npm run dev
```

## Running Using Docker
```
docker compose up
```

# ESlint + AirBnb style

This project uses AirBnb style guide for linting and code style:

- [eslint-config-airbnb (React)](https://www.npmjs.com/package/eslint-config-airbnb)
- [eslint-config-airbnb-base for Node](https://www.npmjs.com/package/eslint-config-airbnb-base) < this project use this

```
npx install-peerdeps --dev eslint-config-airbnb-base
```
