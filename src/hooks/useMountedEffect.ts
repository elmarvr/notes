import { useEffect, useRef } from 'react';

const useMountedEffect = (callback: () => void, dependancies?: any[]) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      callback();
    }

    isMountedRef.current = true;
  }, dependancies);
};

export default useMountedEffect;
