import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "select * from product;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch {
      throw new Error("cannot get products");
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "select * from product where id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch {
      throw new Error("cannot get the product");
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `insert into product("name", price, category) 
                   values('${product.name}', ${product.price}, '${product.category}') returning *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch {
      throw new Error("cannot create product");
    }
  }
}
