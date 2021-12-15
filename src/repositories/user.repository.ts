import db from "../db";

const tableName = 'application_user';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const queryString = `
      SELECT id, name, username, email 
      FROM ${tableName};
    `;

    const { rows } = await db.query<User>(queryString);

    return rows || [];
  }

  async findById(id: string): Promise<User> {
    const queryString = `
      SELECT id, name, username, email 
      FROM ${tableName}
      WHERE id = $1 ;
    `;

    const values = [id];

    const { rows: [user] } = await db.query<User>(queryString, values);

    return user;
  }

  async create(user: User): Promise<string> {
    const { name, username, email, password } = user;

    const queryString = `
      INSERT INTO ${tableName} 
      (name, username, email, password) VALUES 
      ($1, $2, $3, CRYPT($4, $5)) 
      RETURNING id;
    `;

    const values = [name, username, email, password, 'my_secret'];

    const { rows: [{ id }] } = await db.query<{ id: string }>(queryString, values);

    return id;
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

    const { rowCount } = await db.query(queryString);

    return rowCount;
  }

  async delete(id: string): Promise<number> {
    const queryString = `
      DELETE FROM ${tableName} 
      WHERE id = '${id}';
    `;

    const { rowCount } = await db.query(queryString);

    return rowCount;
  }
}

export default new UserRepository();