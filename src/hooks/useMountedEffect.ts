import { useEffect, useRef } from 'react';

const useMountedEffect = (callback: () => void, dependencies?: any[]) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      callback();
    }

    isMountedRef.current = true;
  }, dependencies);
};

export default useMountedEffect;
