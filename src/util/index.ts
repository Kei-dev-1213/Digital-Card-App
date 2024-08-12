import { Skill } from "../type/Skill";
import { User } from "../type/User";
import { UserCard } from "../type/UserCard";

const mapDBToUserCard = (user: User, skill: Skill) => {
  return new UserCard(user.user_id, user.name, skill.name, user.description, user.github_id, user.qiita_id, user.x_id);
};

export const Util = {
  mapDBToUserCard,
};
