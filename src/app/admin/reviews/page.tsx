'use client';

// React
import { useState } from 'react';

// Components
import Admin from 'app/admin/_Admin/Admin';

// Types
import type { FC, JSX } from 'react';

const ReviewsAdmin: FC = (): JSX.Element => {
  // States
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  return (
    <Admin type="review" website={website} setWebsite={setWebsite} name={name} setName={setName} />
  );
};

export default ReviewsAdmin;
