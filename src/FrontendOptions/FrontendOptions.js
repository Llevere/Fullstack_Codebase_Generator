export const FrontendOptions = Object.freeze({
  REACT_JS: "React.js",
  REACT_TS: "React.ts",
  VUE_JS: "Vue.js",
});

export default function getFrontendOptions() {
  return Object.values(FrontendOptions);
}
