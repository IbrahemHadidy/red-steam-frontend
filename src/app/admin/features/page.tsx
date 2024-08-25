'use client';

// React
import { useState } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import Admin from 'app/admin/_Admin/Admin';

// Services
import { createFeature } from 'services/common/features';

// Types
import type { ChangeEvent, FC, JSX } from 'react';

const FeaturesAdmin: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const [submitted, setSubmitted] = useState<number>(0);

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file); // Read the file as a data URL (Base64 encoded)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setIcon(reader.result.split(',')[1]); // Extract the Base64 string
        }
      };
    }
  };

  const onSubmit = async (): Promise<void> => {
    const result: { message: string } = await createFeature(name, icon);
    toast.success(result.message);
    setSubmitted(submitted + 1);
    setName('');
    setIcon('');
  };

  return (
    <Admin
      type="feature"
      name={name}
      setName={setName}
      handleIconChange={handleIconChange}
      icon={icon}
      onSubmit={onSubmit}
      submitted={submitted}
    />
  );
};

export default FeaturesAdmin;
