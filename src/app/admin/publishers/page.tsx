'use client';

// React
import { useState } from 'react';

// Components
import Admin from '@app/admin/_Admin/Admin';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { createPublisher } from '@services/common/publishers';

// Types
import type { FC, JSX } from 'react';

const PublishersAdmin: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    const result: { message: string } = await createPublisher(name, website);
    await toast.promise(
      new Promise<{ message: string }>((resolve, reject) => {
        if (result.message) {
          resolve(result);
        } else {
          reject(new Error('Failed to create publisher'));
        }
      }),
      {
        success: result.message,
        error: 'Failed to create publisher',
        pending: 'Creating publisher...',
      }
    );
    setSubmitted((prevSubmitted) => prevSubmitted + 1);
    setName('');
    setWebsite('');
  };

  return (
    <Admin
      type="publisher"
      website={website}
      setWebsite={setWebsite}
      name={name}
      setName={setName}
      onSubmit={onSubmit}
      submitted={submitted}
    />
  );
};

export default PublishersAdmin;
