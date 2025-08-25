# Bastion
Bastion is an activity based app that is meant to help users achive daily tasks

# Local development

## Database
This project uses Turso as it's primary database, therefore a local instance of libsql/sqld is nessesary. See [documentation][https://github.com/tursodatabase/libsql/blob/main/docs/BUILD-RUN.md] on how to set up a local instance of libsql/sqld.

When you have installed libsql/sqld, start the local instance. You can run the +db-init.sh file to start the database, it assummes you hace the turso cli installed but creates a local db file so as to avoid an empehemeral database.

## Running the app
Install dependencies, this project uses pnpm.
```
pnpm install
```

Then run the dev command to start up both the api and web app. This project uses turborepo to handle the monorepo.
```
pnpm dev
```
