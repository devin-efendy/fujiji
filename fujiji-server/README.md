# Fujiji Server

Backend/Server application for Fujiji build using Node.js, Express, and Azure SQL

# Getting Started

Create `.env` file:

```
cp .env.test .env
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

First, install the dependencies

```
npm install
```

**If you are on Windows:** edit your `package.json` for `dev` script:

```
"scripts": {
    "dev": "nodemon --legacy-watch src/app.js",
    ...,
  },
```

**Optional:** If you install new dependencies you need to run

```
docker compose up --build
```

Running the services

```
docker compose up

# OR you can also use this to run in detached mode
docker compose up -d
```

To stop the services

```
docker compose stop
```

To stop and remove services

```
docker compose down
```

## Database Setup

After running docker compose up, you need to run the `up` migration script.

Make sure your container run first by running

```
docker container ls
```

Then, you need to exec into `fujiji-db` container. (You can also replace `fujiji-db` with the Container ID)

```
docker exec -it fujiji-db "bash"
```

Now we are inside the mssql server with bash environment. So, now, we can run the migration script

```
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Fujiji123" -i scripts/up.sql
```
