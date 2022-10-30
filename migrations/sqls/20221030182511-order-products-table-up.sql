-- create order_products table it has id, quantity, order_id, product_id
CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  order_id bigint NOT NULL,
  product_id bigint NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);