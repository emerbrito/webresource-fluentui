import { ReactNode } from 'react';

export const ProdAuthProvider = ({ children }: { children: ReactNode }) => {
  // Simply returns children without any auth wrapping
  return <>{children}</>;
};