# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `GET` `/products`
  - no body
  - returns an array of product objects
- Show `GET` `/products/:id`
  - no body
  - returns a single product object
- Create [token required] `POST` `/products`
  - body: `{ name: string, price: number, category_id: number }`
  - returns the created product object
- Create Category [token required] `POST` `/categories`
  - body: `{ name: string }`
  - returns the created category object
- [OPTIONAL] Top 5 most popular products [NOT IMPLEMENTED]
- [OPTIONAL] Products by category (args: product category) `GET` `/products/category/:id`
  - no body
  - returns an array of product objects

#### Users
- Index [token required] `GET` `/users`
  - no body
  - returns an array of user objects
- Show [token required] `GET` `/users/:id`
  - no body
  - returns a single user object
- Create N[token required] `POST` `/users`
  - body: `{ firstname: string, lastname: string, email: string, password: string }`
  - returns a token
- [OPTIONAL] Authenticate N[token required] `POST` `/users/authenticate`
  - body: `{ email: string, password: string }`
  - returns a token
- [OPTIONAL] Update [token required] `PATCH` `/users/:id`
  - body: one field is enough `{ firstname: string, lastname: string, email: string, password: string }`
  - returns the updated user object
- [OPTIONAL] Remove [token required] `DELETE` `/users/:id`
  - no body
  - returns the deleted user object

#### Orders
- Current Orders by user (args: user id)[token required] `GET` `/orders/current`
  - body: `{ user_id: number }`
  - returns an array of order objects
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `GET` `/orders/completed`
  - body: `{ user_id: number }`
  - returns an array of order objects
- [OPTIONAL] Index [token required] `GET` `/orders`
  - no body
  - returns an array of order objects
- [OPTIONAL] Show [token required] `GET` `/orders/:id`
  - no body
  - returns a single order object
- [OPTIONAL] Create [token required] `POST` `/orders`
  - body: `{ user_id: number, status: string }`
  - status can be either "active" or "complete"
  - returns the created order object
- [OPTIONAL] Delete [token required] `DELETE` `/orders/:id`
  - no body
  - returns the deleted order object
- [OPTIONAL] Add Product [token required] `POST` `/orders/:id/products`
  - body: `{ product_id: number, quantity: number }`
  - returns the updated order object

## Data Shapes

### Category
- id
- name
#### Product
-  id
- name
- price
- category_id

#### User
- id
- firstName
- lastName
- email
- password

#### Orders
- id
- status
- user_id

#### OrderProducts
- id
- quantity
- order_id
- product_id

## Database Schema
![Database Schema](https://res.cloudinary.com/khalid-faisal/image/upload/v1667512473/Personal/storefront-api-db-schema_xvgzmm.png)

User Schema
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

Category Schema
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
```

Product Schema
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

Order Schema
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20) NOT NULL,
  user_id bigint NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

OrderProducts Schema
```sql
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  order_id bigint NOT NULL,
  product_id bigint NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```