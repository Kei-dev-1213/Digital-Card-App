import { FC, memo, useEffect, useState } from "react";
import * as UI from "@chakra-ui/react";
import { DB } from "../../supabase";
import { Skill } from "../../type/Skill";
import { Loading } from "../../components/ui/Loading";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInputs } from "../../type/UserInputs";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
import { PageWrapper } from "../../components/ui/layout/PageWrapper";
import { PageTitle } from "../../components/ui/layout/PageTitle";
import { Util } from "../../util";
import { Link } from "../../components/ui/card/LinkToTop";
import { CheckIcon } from "@chakra-ui/icons";

export const Register: FC = memo(() => {
  // hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserInputs>();
  const navigate = useNavigate();
  const { displayMessage } = useMessage();

  // state
  const [loading, setLoading] = useState(true);
  const [registLoading, setRegistLoading] = useState(false);
  const [skills, setSkills] = useState<Array<Skill>>([]);

  // 初期処理
  useEffect(() => {
    (async () => {
      reset();
      setSkills(await DB.fetchAllSkills());
      setLoading(false);
    })();
  }, []);

  // functions
  // 登録
  const regist: SubmitHandler<UserInputs> = async (registFormData: UserInputs) => {
    setRegistLoading(true);
    await DB.registUserCardInfo(registFormData);
    displayMessage({ title: "登録が完了しました。", status: "success" });
    Util.fireConfetti();
    navigate("/");
  };

  return (
    <PageWrapper my="10">
      <PageTitle>新規名刺登録</PageTitle>
      {loading ? (
        <Loading />
      ) : (
        <>
          <UI.Card w="80%" mx="auto" p={5}>
            <form onSubmit={handleSubmit(regist)}>
              <UI.FormControl pb={3}>
                <UI.FormLabel>好きな英単語 *</UI.FormLabel>
                <UI.Input
                  data-testid="input-user-id"
                  type="text"
                  placeholder="coffee"
                  {...register("user_id", {
                    required: "好きな英単語は必須項目です。",
                    pattern: { value: /^[a-zA-Z0-9_]+$/, message: "好きな英単語は半角英数字で入力してください。" },
                  })}
                />
                <UI.Box color="red">{errors.user_id && errors.user_id.message}</UI.Box>
              </UI.FormControl>
              <UI.FormControl pb={3}>
                <UI.FormLabel>お名前 *</UI.FormLabel>
                <UI.Input
                  data-testid="input-name"
                  type="text"
                  {...register("name", {
                    required: "お名前は必須項目です。",
                  })}
                />
                <UI.Box color="red">{errors.name && errors.name.message}</UI.Box>
              </UI.FormControl>
              <UI.FormControl pb={3}>
                <UI.FormLabel>自己紹介 *</UI.FormLabel>
                <UI.Textarea
                  data-testid="input-description"
                  placeholder="<h1>HTMLタグも使えます</H1>"
                  height="200px"
                  {...register("description", {
                    required: "自己紹介は必須項目です。",
                  })}
                />
                <UI.Box color="red">{errors.description && errors.description.message}</UI.Box>
              </UI.FormControl>
              <UI.FormControl pb={3}>
                <UI.FormLabel>好きな技術 *</UI.FormLabel>
                <UI.Select
                  data-testid="input-skill-id"
                  placeholder="好きな技術を選択"
                  {...register("skill_id", {
                    required: "好きな技術は必須項目です。",
                  })}
                >
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </UI.Select>
                <UI.Box color="red">{errors.skill_id && errors.skill_id.message}</UI.Box>
                <UI.FormControl pb={3}>
                  <UI.FormLabel>Github ID</UI.FormLabel>
                  <UI.Input
                    data-testid="input-github-id"
                    type="text"
                    {...register("github_id", {
                      pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Github IDは半角英数字で入力してください。" },
                    })}
                  />
                  <UI.Box color="red">{errors.github_id && errors.github_id.message}</UI.Box>
                </UI.FormControl>
                <UI.FormControl pb={3}>
                  <UI.FormLabel>Qiita ID</UI.FormLabel>
                  <UI.Input
                    data-testid="input-qiita-id"
                    type="text"
                    {...register("qiita_id", {
                      pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Qiita IDは半角英数字で入力してください。" },
                    })}
                  />
                  <UI.Box color="red">{errors.qiita_id && errors.qiita_id.message}</UI.Box>
                </UI.FormControl>
                <UI.FormControl pb={3}>
                  <UI.FormLabel>X ID</UI.FormLabel>
                  <UI.Input
                    data-testid="input-x-id"
                    type="text"
                    placeholder="@は不要"
                    {...register("x_id", {
                      pattern: { value: /^[a-zA-Z0-9_]+$/, message: "X IDは半角英数字で入力してください。" },
                    })}
                  />
                  <UI.Box color="red">{errors.x_id && errors.x_id.message}</UI.Box>
                </UI.FormControl>
                <UI.Box>*は必須項目です</UI.Box>
              </UI.FormControl>
              <UI.Button type="submit" colorScheme="teal" w="100%" isLoading={registLoading} isDisabled={registLoading}>
                <CheckIcon mr={2} />
                登録
              </UI.Button>
            </form>
          </UI.Card>
          <Link linkText="TOPに戻る" to="/" />
        </>
      )}
    </PageWrapper>
  );
});
