-- create orders table it has id, status, user_id
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR(20) NOT NULL,
  user_id bigint NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);