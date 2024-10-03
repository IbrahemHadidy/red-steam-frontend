'use client';

// React
import { useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Admin from '@app/admin/_Admin/Admin';

// Services
import { createLanguage } from '@services/common/languages';

// Types
import type { JSX } from 'react';

export default function LanguagesAdmin(): JSX.Element {
  // States
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    await toast.promise(createLanguage(name.trim()), {
      pending: 'Creating language...',
      success: 'Language created successfully',
      error: 'Failed to create language, please try again',
    });

    setSubmitted((prevSubmitted) => prevSubmitted + 1);
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
