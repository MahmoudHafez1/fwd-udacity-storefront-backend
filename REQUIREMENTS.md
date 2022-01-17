# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  '/product' [Get]
- Show
  '/product/:id' [Get]
- Create
  '/product' [token required] [Post]
  (body: {name: string, price:number, category:string})

#### Users

- Index
  '/user' [token required] [Get]
- Show
  '/user/:id' [token required] [Get]
- Create '/user' [Post]
  (body:{first_name: stirng, last_name: string, pass: string})

#### Orders

- Create Order
  '/order' [token required] [post]
- Current Order by user
  '/order/:user_id' [token required] [Get]

## Data Shapes

#### Product

- id
- name
- price
- category

#### User

- id
- first_name
- last_name
- pass

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Tables

- product (id: serial primary key, name: varchar, price: decimal, category: varchar)
- user (id: serial primary key, firstName: varchar, lastName: varchar, pass: varchar)
- order (id: serial primary key, user_id: int[foreign key to user table], order_status: varchar)
- order_products (order_id: foreign key to order table, product_id: foreign key to product table, quantity: int)
