CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"(id),
    order_status VARCHAR)