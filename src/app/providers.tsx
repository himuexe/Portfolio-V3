"use client";

import { ReactNode } from 'react';
import ReduxProvider from '@/store/ReduxProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ReduxProvider>{children}</ReduxProvider>;
} 