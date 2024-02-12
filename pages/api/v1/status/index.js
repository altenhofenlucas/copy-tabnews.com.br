import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const { rows: serverVersionResultRows } = await database.query(
    "SELECT * FROM pg_settings WHERE name = 'server_version';",
  );
  const [serverVersionResult] = serverVersionResultRows;
  const databaseVersion = serverVersionResult.setting;

  const { rows: maxConnectionsResultRows } = await database.query(
    "SELECT * FROM pg_settings WHERE name = 'max_connections';",
  );
  const [maxConnectionsResult] = maxConnectionsResultRows;
  const databaseMaxConnections = maxConnectionsResult.setting;

  const { rows: openedConnectionsResultRows } = await database.query({
    name: "fetch-database-used-connections",
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE state = $1 AND datname = $2;",
    values: ["active", process.env.POSTGRES_DB],
  });
  const [openedConnectionsResult] = openedConnectionsResultRows;
  const databaseOpenedConnections = openedConnectionsResult.count;

  return response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: parseInt(databaseOpenedConnections),
      },
    },
  });
}

export default status;
