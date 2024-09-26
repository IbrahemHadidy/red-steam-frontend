'use client';

// React
import { useState } from 'react';

// Components
import Admin from '@app/admin/_Admin/Admin';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { createDeveloper } from '@services/common/developers';

// Types
import type { FC, JSX } from 'react';

const DevelopersAdmin: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  // Event Handlers
  const onSubmit = async (): Promise<void> => {
    await toast.promise(createDeveloper(name.trim(), website.trim()), {
      pending: 'Creating developer...',
      success: 'Developer created successfully',
      error: 'Failed to create developer, please try again',
    });
    setSubmitted((prevSubmitted) => prevSubmitted + 1);
    setName('');
    setWebsite('');
  };

  return (
    <Admin
      type="developer"
      website={website}
      setWebsite={setWebsite}
      name={name}
      setName={setName}
      onSubmit={onSubmit}
      submitted={submitted}
    />
  );
};

export default DevelopersAdmin;
