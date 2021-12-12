CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO application_user (name, username, email, password) VALUES ('Administrator', 'admin', 'teste@gmail.com', crypt('admin', 'my_secret'));

INSERT INTO application_user (name, username, email, password) VALUES ('Simple User', 'auser', 'auser@email.com', crypt('userx', 'my_secret'));