export const BackendOptions = Object.freeze({
  NODE_EXPRESS: "Node.js + Express",
  ASP_NET_CORE: "ASP.NET Core",
  // SPRING_BOOT: "Spring Boot",
  // FLASK: "Flask",
});

export default function getBackendOptions() {
  return Object.values(BackendOptions);
}
