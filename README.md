# Storefront Backend Project

Database schema and RESTful APIs that will be used by frontend developers for an online store.

## Installation Instructions

clone this repo and run the following command in the project directory to install all the required packages

`yarn install`

## Setup Database

- Connect to the default postgres database and insert your env variables in the following commands
- In psql run the following to create a user
  - `CREATE USER <your_username> WITH PASSWORD <your_password>;`
- In psql run the following to create the dev and test databases
  - `CREATE DATABASE <database_name>`
  - `CREATE DATABASE <database_test_name>`

## Env Example

PORT=3000
ENV=dev
POSTGRES_DB=store
POSTGRES_DB_TEST=store_test
POSTGRES_PASSWORD=1234
POSTGRES_USER=store_user
POSTGRES_OWNE=company
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
BCRYPT_PASSWORD=my_pass
SALT_ROUNDS=10
TOKEN_SECRET=asdfghj

## Test

run `yarn test`
