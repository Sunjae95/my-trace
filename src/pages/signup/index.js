import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { Button, Input, Text } from '@components';
import { ERROR_CODE_MESSAGE_MAP, SIGN_IN_PAGE } from '@constants';
import { FONT_SIZE, FONT_WEIGHT } from '@styles';
import { signUpAPI } from '@services';
import { isValid } from '@utils';
import { useForm } from '@hooks';

const SignupPage = () => {
  const { push } = useRouter();
  const [error, setError] = useState(null);

  const { form, changeForm } = useForm({ id: '', password: '', passwordCheck: '' });

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
      <InputContainer>
        <InputWrapper>
          <Text
            text="이메일"
            size={FONT_SIZE.small}
          />
          <CustomInput
            hasBorder
            placeholder="이메일 형식을 작성해주세요."
            name="id"
            value={form.id}
            onChange={changeForm}
          />
        </InputWrapper>
        <InputWrapper>
          <Text
            text="비밀번호"
            size={FONT_SIZE.small}
          />
          <CustomInput
            hasBorder
            type="password"
            name="password"
            placeholder="영어 대소문자, 숫자, 특수문자 1개이상"
            value={form.password}
            onChange={changeForm}
          />
        </InputWrapper>
        <InputWrapper>
          <Text
            text="비밀번호확인"
            size={FONT_SIZE.small}
          />
          <CustomInput
            hasBorder
            type="password"
            name="passwordCheck"
            placeholder="영어 대소문자, 숫자, 특수문자 1개이상"
            value={form.passwordCheck}
            onChange={changeForm}
          />
        </InputWrapper>
        {error && (
          <Text
            text={error}
            size={FONT_SIZE.small}
            color={'red'}
          />
        )}
      </InputContainer>
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const CustomInput = styled(Input)`
  &::placeholder {
    font-size: ${FONT_SIZE.small};
  }
`;
