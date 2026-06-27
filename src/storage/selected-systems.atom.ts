import { atom } from 'jotai';

import { SYSTEM_CONFIGS } from '@/configs';

export const selectedSystemsAtom = atom<string[]>(
  SYSTEM_CONFIGS.filter((system) => system.isVisibleByDefault).map(
    (system) => system.modelName,
  ),
);
