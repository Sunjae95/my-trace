import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Text } from '@components';
import { SIGN_IN_PAGE } from '@constants';
import { FONT_SIZE, FONT_WEIGHT } from '@styles';

const SignupPage = () => {
  const { push } = useRouter();
  const [form, setForm] = useState({ id: '', password: '', passwordCheck: '' });

  const handleChange = useMemo(
    () => ({
      id: (e) => setForm((form) => ({ ...form, id: e.target.value })),
      password: (e) => setForm((form) => ({ ...form, password: e.target.value })),
      passwordCheck: (e) => setForm((form) => ({ ...form, passwordCheck: e.target.value })),
    }),
    []
  );

  const handleSubmit = useCallback(() => {
    // TODO validation id, password, passwordCheck
    // TODO SIGNUP API
    console.log(form);
  }, [form]);

  const handleGoLoginPage = useCallback(() => push(SIGN_IN_PAGE), [push]);

  return (
    <>
      <Text
        text="회원가입"
        weight={FONT_WEIGHT.bold}
        size={FONT_SIZE.large}
      />
      <input
        placeholder="ID"
        value={form.id}
        onChange={handleChange.id}
      />
      <input
        placeholder="Password"
        value={form.password}
        onChange={handleChange.password}
      />
      <input
        placeholder="PasswordCheck"
        value={form.passwordCheck}
        onChange={handleChange.passwordCheck}
      />
      <Button onClick={handleSubmit}>회원가입</Button>
      <Button onClick={handleGoLoginPage}>로그인페이지로 가기</Button>
    </>
  );
};

export default SignupPage;
