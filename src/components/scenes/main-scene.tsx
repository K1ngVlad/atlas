'use client';

import { lazy, Suspense, type FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three';
import { Environment } from '@react-three/drei';
import { useErrorBoundary } from 'use-error-boundary';

import { Controls } from './controls';
import { ModelLoader } from './model-loader';

const LazyModel = lazy(() => import('./model'));

export const MainScene: FC = () => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  if (didCatch) {
    return <div>{error.message}</div>;
  }

  return (
    <ErrorBoundary>
      <Canvas
        fallback={<div>Ваш браузер не поддерживает WebGL!</div>}
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: SRGBColorSpace,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<ModelLoader />}>
          <LazyModel />
        </Suspense>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 4, 2]} intensity={0.5} />
        <Environment preset="city" />
        <Controls />
      </Canvas>
    </ErrorBoundary>
  );
};
