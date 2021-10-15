import DatabaseConnectionAdapter from "../../src/infra/database/DatabaseConnectionAdapter"

test.skip("Deve conectar no banco",async () => {
  const db = new DatabaseConnectionAdapter();
  const result = db.query("SELECT now()")
  expect(result).toBeDefined();
})