import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// 環境変数を読み込む
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

(async () => {
  // ユーザーテーブル削除
  const usersDeleteResult = await supabase.from("users").delete().neq("user_id", 0);
  // ユーザー技術テーブル削除
  const userSkillDeleteResult = await supabase.from("user_skill").delete().neq("id", 0);
  if (!usersDeleteResult.error && !userSkillDeleteResult.error) {
    console.log("all delete successfully");
  }
})();
