import supertest from "supertest";

import { app } from "../../server";
import { Product } from "../../models/product";

const request = supertest(app);

const product: Product = {
  name: "prodName",
  price: 100,
  category: "testCat",
};

let userToken: string;

describe("test product endpoints", () => {
  beforeAll(async () => {
    const res = await request.post("/user").send({
      firstName: "fname",
      lastName: "lname",
      pass: "1234",
    });
    userToken = res.body;
  });

  it("should create product POST '/product' ", async () => {
    const response = await request
      .post("/product")
      .set("authorization", "Bearer " + userToken)
      .send(product);
    expect(response.status).toBe(200);
  });

  it("should get all products GET '/product' ", async () => {
    const response = await request.get("/product");
    expect(response.status).toBe(200);
  });

  it("should get certain product GET '/product/:id' ", async () => {
    const response = await request.get("/product/1");
    expect(response.status).toBe(200);
  });
});
