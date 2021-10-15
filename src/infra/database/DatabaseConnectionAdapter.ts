import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

export default class DatabaseConnectionAdapter implements DatabaseConnection {
  pgp: any;

  constructor() {
    this.pgp = pgp()("postgres://dev:teste12@aspire.home:5432/dev");
  }

  query(statement: string, params: any = []) {
    return this.pgp.query(statement, params);
  }
}
