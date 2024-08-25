'use client';

// React
import { useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Admin from 'app/admin/_Admin/Admin';

// Services
import { createLanguage } from 'services/common/languages';

// Types
import type { FC, JSX } from 'react';

const LanguagesAdmin: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    const result: { message: string } = await createLanguage(name);
    toast.success(result.message);
    setSubmitted(submitted + 1);
    setName('');
  };

  return (
    <Admin
      type="language"
      name={name}
      setName={setName}
      onSubmit={onSubmit}
      submitted={submitted}
    />
  );
};

export default LanguagesAdmin;
