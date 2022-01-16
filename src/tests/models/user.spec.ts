import { User, UserStore } from "../../models/user";

const store = new UserStore();

const user: User = {
  first_name: "fName",
  last_name: "lName",
  pass: "pass",
};

describe("test user methods", () => {
  it("should create new user", async () => {
    const res = await store.create(user);
    user.id = res.id;
    expect(res).toBeTruthy();
  });

  it("should get all users", async () => {
    const res = await store.index();
    expect(res).toBeTruthy();
  });

  it("should return test user", async () => {
    const result = await store.show(user.id as number);
    expect(result.first_name).toEqual(user.first_name);
  });
});
