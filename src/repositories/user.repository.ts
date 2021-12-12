import db from "../db";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const queryString = `
      SELECT id, name, username, email 
      FROM application_user;
    `;

    const { rows } = await db.query(queryString);

    return rows || [];
  }
}

export default new UserRepository();