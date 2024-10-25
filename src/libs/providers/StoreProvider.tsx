'use client';

// React
import { useRef } from 'react';

// Redux
import { AppStore, makeStore } from '@store/store';
import { Provider } from 'react-redux';

// Types
import type { ReactNode } from 'react';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return storeRef.current && <Provider store={storeRef.current}>{children}</Provider>;
}
