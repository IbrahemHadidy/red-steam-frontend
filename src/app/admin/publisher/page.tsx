'use client';

// React
import { useState } from 'react';

// Components
import Admin from 'app/admin/_Admin/Admin';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { createPublisher } from 'services/common/publishers';

// Types
import type { FC, JSX } from 'react';

const PublisherCreate: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const onSubmit = async (): Promise<void> => {
    const result: { message: string } = await createPublisher(name, website);
    toast.success(result.message);
    setSubmitted(submitted + 1);
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

export default PublisherCreate;
