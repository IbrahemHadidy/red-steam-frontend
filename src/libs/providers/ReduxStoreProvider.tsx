'use client';

// React
import { useRef } from 'react';

// Redux
import makeStore, { AppStore } from '@store/store';
import { Provider } from 'react-redux';

// Types
import type { ReactNode } from 'react';

interface ReduxStoreProviderProps {
  children: ReactNode;
}

export default function ReduxStoreProvider({ children }: ReduxStoreProviderProps) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) storeRef.current = makeStore();
  return storeRef.current && <Provider store={storeRef.current}>{children}</Provider>;
}
