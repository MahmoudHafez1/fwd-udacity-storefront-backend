import supertest from "supertest";

import { app } from "../../server";

const request = supertest(app);

let userToken: string;

describe("test user endpoints", () => {
  beforeAll(async () => {
    const res = await request.post("/user").send({
      firstName: "fname",
      lastName: "lname",
      pass: "1234",
    });
    userToken = res.body;
  });

  it("should show user GET '/user/:id' ", async () => {
    const response = await request
      .get("/user/1")
      .set("authorization", "Bearer " + userToken);
    expect(response.status).toBe(200);
  });

  it("should get all users GET '/user' ", async () => {
    const response = await request
      .get("/user")
      .set("authorization", "Bearer " + userToken);
    expect(response.status).toBe(200);
  });
});
