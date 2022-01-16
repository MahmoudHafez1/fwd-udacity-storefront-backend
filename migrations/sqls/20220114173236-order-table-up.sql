CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    order_status VARCHAR)