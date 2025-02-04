export const DatabaseOptions = Object.freeze({
  MYSQL: "MySQL",
  POSTGRESQL: "PostgreSQL",
  MONGODB: "MongoDB",
  SQLITE: "SQLite",
});

export default function getDatabaseOptions() {
  return Object.values(DatabaseOptions);
}
