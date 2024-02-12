test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const { update_at, dependencies } = await response.json();
  expect(update_at).toBeDefined();
  expect(dependencies).toBeDefined();

  const parsedUpdateAt = new Date(update_at).toISOString();
  expect(update_at).toBe(parsedUpdateAt);

  expect(dependencies.database).toBeDefined();
  const { database } = dependencies;
  expect(database.version).toBeDefined();
  expect(database.version).toBe("16.0");

  expect(database.max_connections).toBeDefined();
  expect(database.max_connections).toBe(100);

  expect(database.opened_connections).toBeDefined();
  expect(database.opened_connections).toBe(1);
});
