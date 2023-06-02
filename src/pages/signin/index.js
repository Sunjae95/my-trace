import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Button, Input, Text } from '@components';
import { ERROR_CODE_MESSAGE_MAP, HOME_PAGE, SIGN_UP_PAGE } from '@constants';
import { FONT_SIZE, FONT_WEIGHT } from '@styles';
import { signInAPI } from '@services';
import { isValid } from '@utils';

const LoginPage = () => {
  const { push } = useRouter();
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = useMemo(
    () => ({
      id: (value) => setForm((form) => ({ ...form, id: value })),
      password: (value) => setForm((form) => ({ ...form, password: value })),
    }),
    []
  );

  const handleGoSignUpPage = useCallback(() => push(SIGN_UP_PAGE), [push]);

  const handleSubmit = useCallback(async () => {
    try {
      await signInAPI(form.id, form.password);
      push(HOME_PAGE);
    } catch (error) {
      setError(ERROR_CODE_MESSAGE_MAP.get(error.code) ?? null);
    }
  }, [form, push]);

  const isAbleSignIn = useMemo(() => isValid.email(form.id) && isValid.password(form.password), [form]);

  return (
    <>
      <Text
        text="로그인"
        weight={FONT_WEIGHT.bold}
        size={FONT_SIZE.large}
      />
      <InputWrapper>
        <Input
          hasBorder
          placeholder="이메일"
          value={form.id}
          onChange={handleChange.id}
        />
        <Input
          hasBorder
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange.password}
        />
        {error && (
          <Text
            text={error}
            size={FONT_SIZE.small}
            color={'red'}
          />
        )}
      </InputWrapper>
      <Button
        disabled={!isAbleSignIn}
        onClick={handleSubmit}
      >
        로그인
      </Button>
      <Button onClick={handleGoSignUpPage}>회원가입페이지로 가기</Button>
    </>
  );
};

export default LoginPage;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
