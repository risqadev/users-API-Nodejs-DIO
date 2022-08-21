import db from "../db";
import dotenv from 'dotenv';
dotenv.config();
import DatabaseError from "../models/errors/Database.error.model";

const tableName = 'application_user';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const queryString = `
      SELECT id, name, username, email 
      FROM ${tableName};
    `;

    try {
      const { rows } = await db.query<User>(queryString);  
      return rows || [];
    } catch (error) {
      throw new DatabaseError('User query error.');
    }
  }

  async findById(id: string): Promise<User> {
    const queryString = `
      SELECT id, name, username, email 
      FROM ${tableName}
      WHERE id = $1 ;
    `;
    
    try {
      const { rows: [user] } = await db.query<User>(queryString, [id]);
      return user;
    } catch (error) {
      throw new DatabaseError('Error querying user by id.');
    }
  }

  async create(user: User): Promise<string> {
    const { name, username, email, password } = user;
    const values = [name, username, email, password, process.env.DB_CRYPT_SECRET];

    const queryString = `
      INSERT INTO ${tableName} 
      (name, username, email, password) VALUES 
      ($1, $2, $3, CRYPT($4, $5)) 
      RETURNING id;
    `;

    try {
      const { rows: [{ id }] } = await db.query<{ id: string }>(queryString, values);
      return id;
    } catch (error) {
      throw new DatabaseError('Error creating user.');
    }
  }

  async update(user: { id: string; name?: string; username?: string; email?: string; password?: string }): Promise<number> {
    const { id, ...modifiers } = user;

    const entries = Object.entries(modifiers);
    const keyValueToSQLSyntax = entries.map(([key, value]) => {
      return `${key} = '${value}'`
    });
    const setString = keyValueToSQLSyntax.join(', ');

    const queryString = `
      UPDATE ${tableName} 
      SET 
        ${setString} 
      WHERE 
        id = '${id}';
    `;

    try {
      const { rowCount } = await db.query(queryString);
      return rowCount;
    } catch (error) {
      throw new DatabaseError('User update error.');
    }
  }

  async delete(id: string): Promise<number> {
    const queryString = `
      DELETE FROM ${tableName} 
      WHERE id = '${id}';
    `;

    try {
      const { rowCount } = await db.query(queryString);
      return rowCount;
    } catch (error) {
      throw new DatabaseError('Error removing user.');
    }
  }
}

export default new UserRepository();