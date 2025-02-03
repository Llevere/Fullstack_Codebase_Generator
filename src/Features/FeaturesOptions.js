export const FeaturesOptions = Object.freeze({
  JWT_AUTH: "JWT Authentication",
  ROLE_BASED_ACCESS: "Role-Based Access",
  DB_ORM: "Database ORM",
  GRAPHQL: "GraphQL Support",
  WEBSOCKETS: "WebSockets",
  CI_CD: "CI/CD Integration",
});

export default function getFeatureOptions() {
  return Object.values(FeaturesOptions);
}
