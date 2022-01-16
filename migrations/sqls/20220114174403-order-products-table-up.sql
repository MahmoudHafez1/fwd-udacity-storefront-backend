CREATE TABLE order_products (
    order_id INT REFERENCES "order",
    product_id INT REFERENCES product,
    quantity INT,
    PRIMARY KEY(order_id, product_id));