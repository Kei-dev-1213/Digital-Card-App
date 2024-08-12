import { CONSTANT } from "../constant";

export class UserCard {
  constructor(
    public user_id: string,
    public name: string,
    public skill: string,
    public description: string,
    public github_id: string,
    public qiita_id: string,
    public x_id: string
  ) {}

  getGithubUrl() {
    return `${CONSTANT.GITHUB_URL_PREFIX}${this.github_id}`;
  }

  getQiitaUrl() {
    return `${CONSTANT.QIITA_URL_PREFIX}${this.qiita_id}`;
  }

  getXUrl() {
    return `${CONSTANT.X_URL_PREFIX}${this.x_id}`;
  }
}
