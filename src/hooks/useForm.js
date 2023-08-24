import { useCallback, useState } from 'react';

export const useForm = (initialForm) => {
  const [originForm] = useState(initialForm);
  const [form, setForm] = useState(initialForm);

  const resetForm = useCallback(() => setForm(originForm), [originForm]);

  const changeForm = useCallback((e) => {
    const { name, value } = e.target;

    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  return { originForm, form, resetForm, changeForm };
};
