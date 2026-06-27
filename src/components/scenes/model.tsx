'use client';

import { type FC } from 'react';
import { useGLTF } from '@react-three/drei';

import { useApplyModelVisibility, useOrganSelection } from '@/hooks';

export const Model: FC = () => {
  const { scene } = useGLTF('/models/model.glb');

  useApplyModelVisibility(scene);
  const { handleClick } = useOrganSelection(scene);

  return (
    <primitive
      scale={[3, 3, 3]}
      position={[0, 0, 1]}
      object={scene}
      onClick={handleClick}
    />
  );
};

useGLTF.preload('/models/model.glb');

export default Model;
