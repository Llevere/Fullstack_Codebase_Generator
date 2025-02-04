export const CICDOptions = Object.freeze({
  GITHUB_ACTIONS: "Github Actions",
  JENKINS: "Jenkins",
  GITLAB_CICD: "GitLab CI/CD",
  CIRCLECI: "CircleCI",
});

export default function getCICDOptions() {
  return Object.values(CICDOptions);
}
