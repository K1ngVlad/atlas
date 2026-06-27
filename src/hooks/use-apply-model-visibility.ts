import { useEffect } from 'react';
import { useStore } from 'jotai';
import type { Object3D } from 'three';

import { modelRenderService } from '@/services';

import { selectedSystemsAtom } from '@/storage';

export const useApplyModelVisibility = (scene: Object3D): void => {
  const store = useStore();

  useEffect(() => {
    if (!scene) return;

    modelRenderService.applyVisibility(scene, store.get(selectedSystemsAtom));

    const unsubscribe = store.sub(selectedSystemsAtom, () => {
      modelRenderService.applyVisibility(scene, store.get(selectedSystemsAtom));
    });

    return unsubscribe;
  }, [scene, store]);
};
