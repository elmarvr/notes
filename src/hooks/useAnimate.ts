import { useContext } from 'react';

import AnimateContext from '../context/AnimateContext';

const useAnimate = () => {
  return useContext(AnimateContext);
};

export default useAnimate;
