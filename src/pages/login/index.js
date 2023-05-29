import React, { useCallback, useMemo, useState } from 'react';

import { Button } from '@components';

const LoginPage = () => {
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

  return (
    <>
      Login
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
    </>
  );
};

export default LoginPage;
