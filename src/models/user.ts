import bcrypt from "bcrypt";

import client from "../database";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  pass: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `select * from "user"`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch {
      throw new Error("cannot get users");
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'select * from "user" where id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch {
      throw new Error("cannot get the user");
    }
  }

  async create(user: User): Promise<User> {
    try {
      const pepper = process.env.BCRYPT_PASSWORD;
      const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
      const hash = bcrypt.hashSync(user.pass + pepper, saltRounds);
      const conn = await client.connect();
      const sql =
        'insert into "user" (first_name, last_name, pass) values($1, $2, $3) returning *';
      const result = await conn.query(sql, [
        user["first_name"],
        user["last_name"],
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch {
      throw new Error("cannot create User");
    }
  }
}
