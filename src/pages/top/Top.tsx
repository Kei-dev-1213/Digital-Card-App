import { FC, memo, useEffect } from "react";
import * as UI from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../../components/ui/layout/PageWrapper";
import { PageTitle } from "../../components/ui/layout/PageTitle";
import { UserSearchInputs } from "../../type/UserSearchInputs";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "../../components/ui/card/LinkToTop";

export const Top: FC = memo(() => {
  // hooks
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserSearchInputs>();
  const navigate = useNavigate();

  // 初期処理
  useEffect(() => reset(), []);

  // functions
  // 検索
  const search: SubmitHandler<UserSearchInputs> = async (formData: UserSearchInputs) => {
    navigate(`/cards/${formData.user_id}`);
  };

  return (
    <PageWrapper h="100vh">
      <PageTitle>デジタル名刺アプリ</PageTitle>
      <UI.Card w="80%" mx="auto" p={5}>
        <form onSubmit={handleSubmit(search)}>
          <UI.FormControl pb={3}>
            <UI.FormLabel>ユーザーID</UI.FormLabel>
            <UI.Input
              data-testid="input-user-id"
              type="text"
              placeholder="IDを入力"
              {...register("user_id", {
                pattern: { value: /^[a-zA-Z0-9_]+$/, message: "ユーザーIDは半角英数字で入力してください。" },
              })}
            />
            <UI.Box color="red">{errors.user_id && errors.user_id.message}</UI.Box>
          </UI.FormControl>
          <UI.Button
            type="submit"
            colorScheme="teal"
            w="100%"
            isDisabled={(errors.user_id && true) || !watch("user_id")}
          >
            <SearchIcon />
            名刺を見る
          </UI.Button>
        </form>
      </UI.Card>
      <Link linkText="新規登録はこちら" to="/cards/register" />
    </PageWrapper>
  );
});
