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
import type { FC, JSX } from 'react';

const TagsAdmin: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    const result = await createTag(name);
    await toast.promise(
      new Promise<{ message: string }>((resolve, reject) => {
        if (result.message) {
          resolve(result);
        } else {
          reject(new Error('Failed to create tag'));
        }
      }),
      {
        success: result.message,
        error: 'Failed to create tag',
        pending: 'Creating tag...',
      }
    );

    setSubmitted((prevSubmitted) => prevSubmitted + 1);
    setName('');
  };

  return (
    <Admin type="tag" name={name} setName={setName} onSubmit={onSubmit} submitted={submitted} />
  );
};

export default TagsAdmin;
