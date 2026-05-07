import { useContext } from 'react';
import { ImageryContext } from '@/lib/imageryStore';

export function useImagery() {
  const ctx = useContext(ImageryContext);
  if (!ctx) throw new Error('useImagery must be used inside <ImageryProvider>');
  return ctx;
}
