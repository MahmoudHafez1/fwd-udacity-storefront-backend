import { Order, OrderStore } from "../../models/order";
import { Product, ProductStore } from "../../models/product";
import { User, UserStore } from "../../models/user";

const orderStore = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

const product: Product = {
  name: "orderProd",
  price: 12.5,
  category: "prodCat",
};

const user: User = {
  first_name: "fName",
  last_name: "lName",
  pass: "pass",
};

let order: Order;

describe("test order methods", () => {
  beforeAll(async () => {
    const prodRes = await productStore.create(product);
    product.id = prodRes.id;
    const userRes = await userStore.create(user);
    user.id = userRes.id;

    order = {
      user_id: user.id as number,
      order_status: "active",
      products: [{ product_id: product.id as number, quantity: 2 }],
    };
  });

  it("should create new order", async () => {
    const orderRes = await orderStore.create(order);
    expect(orderRes).toBeDefined();
  });

  it("should return order of test user", async () => {
    const currentOrderRes = await orderStore.current(user.id as number);
    expect(currentOrderRes[0].product_name).toEqual("orderProd");
  });
});
