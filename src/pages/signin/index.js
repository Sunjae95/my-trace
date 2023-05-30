import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Text } from '@components';
import { HOME_PAGE, SIGN_UP_PAGE } from '@constants';
import { FONT_SIZE, FONT_WEIGHT } from '@styles';
import { signInAPI } from '@services';

const LoginPage = () => {
  const { push } = useRouter();
  const [form, setForm] = useState({ id: '', password: '' });

  const handleChange = useMemo(
    () => ({
      id: (e) => setForm((form) => ({ ...form, id: e.target.value })),
      password: (e) => setForm((form) => ({ ...form, password: e.target.value })),
    }),
    []
  );

  const handleSubmit = useCallback(async () => {
    // TODO validation id, password
    try {
      await signInAPI(form.id, form.password);
      push(HOME_PAGE);
    } catch {
    } finally {
    }
  }, [form, push]);

  const handleGoSignUpPage = useCallback(() => push(SIGN_UP_PAGE), [push]);

  return (
    <>
      <Text
        text="로그인"
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
      <Button onClick={handleSubmit}>로그인</Button>
      <Button onClick={handleGoSignUpPage}>회원가입페이지로 가기</Button>
    </>
  );
};

export default LoginPage;
