'use client';

import { useEffect, useRef } from 'react';
import { useStore } from 'jotai';
import type { Object3D } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

import { modelRenderService } from '@/services';

import { ORGAN_MAP_BY_MODEL_NAME } from '@/configs';
import {
  selectedOrganAtom,
  selectedSystemsAtom,
  viewModeAtom,
} from '@/storage';

import { ViewMode } from '@/types';

export const useOrganSelection = (
  scene: Object3D,
): { handleClick: (event: ThreeEvent<MouseEvent>) => void } => {
  const store = useStore();
  const previousOrganRef = useRef<string | null>(null);

  useEffect(() => {
    if (!scene) return;

    const unsubscribe = store.sub(selectedOrganAtom, () => {
      const next = store.get(selectedOrganAtom) as string | null;

      if (previousOrganRef.current) {
        modelRenderService.applyOrganHighlight(
          scene,
          previousOrganRef.current,
          false,
        );
      }
      if (next) {
        modelRenderService.applyOrganHighlight(scene, next, true);
      }

      previousOrganRef.current = next;
    });

    return unsubscribe;
  }, [scene, store]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const organName = modelRenderService.findOrganName(event.object);

    if (organName) {
      const organ = ORGAN_MAP_BY_MODEL_NAME.get(organName)!;
      const selectedSystems = store.get(selectedSystemsAtom);
      if (!selectedSystems.includes(organ.systemName)) return;
    }

    store.set(selectedOrganAtom, organName);
    store.set(viewModeAtom, ViewMode.ORGAN_INFO);
  };

  return { handleClick };
};
