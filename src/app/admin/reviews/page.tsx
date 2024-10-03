'use client';

// React
import { useState } from 'react';

// Components
import Admin from '@app/admin/_Admin/Admin';

// Types
import type { JSX } from 'react';

export default function ReviewsAdmin(): JSX.Element {
  // States
  const [name, setName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  return (
    <Admin type="review" website={website} setWebsite={setWebsite} name={name} setName={setName} />
  );
}
