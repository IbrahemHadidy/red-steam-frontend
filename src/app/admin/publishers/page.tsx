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
import type { JSX } from 'react';

export default function PublishersAdmin(): JSX.Element {
  //------------------------------- States --------------------------------//
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    await toast.promise(createPublisher(name.trim(), website.trim()), {
      pending: 'Creating publisher...',
      success: 'Publisher created successfully',
      error: 'Failed to create publisher, please try again',
    });

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
}
