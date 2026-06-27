'use client';

import { lazy, Suspense, type FC } from 'react';
import { Canvas } from '@react-three/fiber';
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
      <Canvas fallback={<div>Ваш браузер не поддерживает WebGL!</div>}>
        <Suspense fallback={<ModelLoader />}>
          <LazyModel />
        </Suspense>
        <ambientLight intensity={1} />
        <Controls />
      </Canvas>
    </ErrorBoundary>
  );
};
