export default class FeatureOptions {
  // Define FeaturesOptions as a static property
  static Options = Object.freeze({
    JWT_AUTHENTICATION: "JWT Authentication",
    ROLE_BASED_ACCESS: "Role-Based Access",
    DATABASE: "Database",
    // GRAPHQL: "GraphQL",
    // WEBSOCKETS: "WebSockets",
  });

  // Static method to return the values of FeaturesOptions
  static getFeatureOptions() {
    return Object.values(FeatureOptions.Options);
  }
}
