import { atom } from 'jotai';

import { ViewMode } from '@/types';

export const viewModeAtom = atom<ViewMode>(ViewMode.ORGAN_INFO);
