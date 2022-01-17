import client from "../database";

export type orderProduct = {
  product_id: number;
  quantity: number;
};

export type Order = {
  id?: number;
  user_id: number;
  order_status: string;
  products: orderProduct[];
};

export type UserOrder = {
  product_name: string;
  quantity: number;
  order_status: string;
};

export class OrderStore {
  async create(order: Order) {
    try {
      const conn = await client.connect();
      const orderSql =
        'insert into "order" (user_id, order_status) values ($1, $2) returning *';
      const orderRes = await conn.query(orderSql, [
        order.user_id,
        order.order_status,
      ]);
      const order_id = orderRes.rows[0].id;
      let orderProductSql =
        "insert into order_products (order_id, product_id, quantity) values";
      for (let i = 0; i < order.products.length; i++) {
        const prod = order.products[i];
        orderProductSql += `(${order_id}, ${prod.product_id}, ${prod.quantity})`;
        if (i != order.products.length - 1) orderProductSql += ",";
        else orderProductSql += "returning *";
      }
      const orderProdRes = await conn.query(orderProductSql);
      return orderProdRes.rows;
    } catch {
      throw new Error("cannot create order");
    }
  }
  async current(user_id: number): Promise<UserOrder[]> {
    try {
      const conn = await client.connect();
      const sql = `select p.name as product_name, op.quantity, o.order_status from "order" o 
                        join order_products op on o.id = op.order_id 
                              join product p on p.id = op.product_id
                                  where o.user_id = ${user_id}`;
      const result = await conn.query(sql);
      return result.rows;
    } catch {
      throw new Error("cannot get user order");
    }
  }
}
