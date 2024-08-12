import { createClient } from "@supabase/supabase-js";
import { User } from "../type/User";
import { UserSkill } from "../type/UserSkill";
import { Skill } from "../type/Skill";
import { Util } from "../util";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

// userIdからカード情報を取得(1件)
const fetchUserSkillInfoFromUserId = async (id: string) => {
  try {
    // ユーザーテーブル
    const userData = await supabase.from("users").select("*").eq("user_id", id);
    const fetchedUserData = (userData.data as Array<User>)[0];

    // ユーザー技術テーブル(中間テーブル)
    const userSkillData = await supabase.from("user_skill").select("*").eq("user_id", fetchedUserData.user_id);
    const fetchedUserSkillData = (userSkillData.data as Array<UserSkill>)[0];

    // 技術テーブル
    const skillData = await supabase.from("skills").select("*").eq("id", fetchedUserSkillData.skill_id);
    const fetchedSkillData = (skillData.data as Array<Skill>)[0];

    return Util.mapDBToUserCard(fetchedUserData, fetchedSkillData);
  } catch (e) {
    console.error(e);
    throw new Error("fetchUserSkillInfoFromUserId：データ取得で想定外のエラーが発生しました");
  }
};

export const DB = {
  fetchUserSkillInfoFromUserId,
};
