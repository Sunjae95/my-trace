import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Button, Input, Text } from '@components';
import { ERROR_CODE_MESSAGE_MAP, SIGN_IN_PAGE } from '@constants';
import { FONT_SIZE, FONT_WEIGHT } from '@styles';
import { signUpAPI } from '@services';
import { isValid } from '@utils';

const SignupPage = () => {
  const { push } = useRouter();
  const [form, setForm] = useState({ id: '', password: '', passwordCheck: '' });
  const [error, setError] = useState(null);

  const handleChange = useMemo(
    () => ({
      id: (value) => setForm((form) => ({ ...form, id: value })),
      password: (value) => setForm((form) => ({ ...form, password: value })),
      passwordCheck: (value) => setForm((form) => ({ ...form, passwordCheck: value })),
    }),
    []
  );

  const handleGoLoginPage = useCallback(() => push(SIGN_IN_PAGE), [push]);

  const handleSubmit = useCallback(async () => {
    try {
      await signUpAPI(form.id, form.password);
      handleGoLoginPage();
    } catch (error) {
      setError(ERROR_CODE_MESSAGE_MAP.get(error.code) ?? null);
    }
  }, [form, handleGoLoginPage]);

  const isAbleSignUp = useMemo(
    () =>
      isValid.email(form.id) &&
      isValid.password(form.password) &&
      isValid.password(form.passwordCheck) &&
      form.password === form.passwordCheck,
    [form]
  );

  return (
    <>
      <Text
        text="회원가입"
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
        <Input
          hasBorder
          type="password"
          placeholder="비밀번호확인"
          value={form.passwordCheck}
          onChange={handleChange.passwordCheck}
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
        disabled={!isAbleSignUp}
        onClick={handleSubmit}
      >
        회원가입
      </Button>
      <Button onClick={handleGoLoginPage}>로그인페이지로 가기</Button>
    </>
  );
};

export default SignupPage;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
