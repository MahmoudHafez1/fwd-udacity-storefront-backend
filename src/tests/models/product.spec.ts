import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

const product: Product = {
  name: "prodName",
  price: 50,
  category: "prodCat",
};

describe("test product methods", () => {
  it("should create new product", async () => {
    const res = await store.create(product);
    product.id = res.id;
    expect(res).toBeTruthy();
  });

  it("should get all products", async () => {
    const res = await store.index();
    expect(res).toBeTruthy();
  });

  it("should return test product", async () => {
    const result = await store.show(product.id as number);
    expect(result.name).toEqual("prodName");
  });
});
