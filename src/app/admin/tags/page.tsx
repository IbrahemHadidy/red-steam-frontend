'use client';

// React
import { useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Admin from '@app/admin/_Admin/Admin';

// Services
import { createTag } from '@services/common/tags';

// Types
import type { JSX } from 'react';

export default function TagsAdmin(): JSX.Element {
  // States
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    await toast.promise(createTag(name.trim()), {
      pending: 'Creating tag...',
      success: 'Tag created successfully',
      error: 'Failed to create tag, please try again',
    });

    setSubmitted((prevSubmitted) => prevSubmitted + 1);
    setName('');
  };

  return (
    <Admin type="tag" name={name} setName={setName} onSubmit={onSubmit} submitted={submitted} />
  );
}
