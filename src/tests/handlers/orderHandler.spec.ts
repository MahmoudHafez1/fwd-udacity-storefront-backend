import supertest from "supertest";
import jwt from "jsonwebtoken";

import { app } from "../../server";

const request = supertest(app);

let userToken: string;

let userId: number;

describe("test order endpoints", () => {
  beforeAll(async () => {
    const userRes = await request.post("/user").send({
      firstName: "fname",
      lastName: "lname",
      pass: "1234",
    });
    userToken = userRes.body;
    const prodRes = await request
      .post("/product")
      .set("authorization", "Bearer " + userToken)
      .send({
        name: "prodName",
        price: 100,
        category: "testCat",
      });
  });

  it("should create order POST '/order' ", async () => {
    const response = await request
      .post("/order")
      .set("authorization", "Bearer " + userToken)
      .send({
        user_id: 1,
        order_status: "status",
        products: [{ product_id: 1, quantity: 2 }],
      });
    expect(response.status).toBe(200);
  });

  it("should get order of user_id =1 GET '/order/:user_id' ", async () => {
    const response = await request
      .get("/order/1")
      .set("authorization", "Bearer " + userToken);
    expect(response.status).toBe(200);
  });
});
