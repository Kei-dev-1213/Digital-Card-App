import confetti from "canvas-confetti";
import { Skill } from "../type/Skill";
import { User } from "../type/User";
import { UserCardInfo } from "../type/UserCardInfo";

const mapDBToUserCard = (user: User, skill: Skill) => {
  return new UserCardInfo(
    user.user_id,
    user.name,
    skill.name,
    user.description,
    user.github_id,
    user.qiita_id,
    user.x_id
  );
};

const fireConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: {
      x: Math.random(),
      y: 0,
    },
    gravity: 1,
    ticks: 1000,
  });
};

export const Util = {
  mapDBToUserCard,
  fireConfetti,
};
