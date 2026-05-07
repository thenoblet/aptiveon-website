import { createContext } from 'react';
import type { ImageryState } from './imagery';

export interface ImageryCtx {
  state: ImageryState;
  set: <K extends keyof ImageryState>(key: K, value: ImageryState[K]) => void;
  reset: () => void;
}

export const ImageryContext = createContext<ImageryCtx | null>(null);
