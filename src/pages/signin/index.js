import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@components';
import { SIGN_UP_PAGE } from '@constants';

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

  const handleSubmit = useCallback(() => {
    // TODO validation id, password
    // TODO LOGIN API
    console.log(form);
  }, [form]);

  const handleGoSignUpPage = useCallback(() => push(SIGN_UP_PAGE), [push]);

  return (
    <>
      로그인
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
