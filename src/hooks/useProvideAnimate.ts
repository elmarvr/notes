import { useState } from 'react';

type State = {
  [prop: string]: any;
};

const useProvideAnimate = () => {
  const [props, setProps] = useState<State>({});

  const setAnimateProp = (name: string, value: any) => {
    setProps((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAnimateProp = (name: string) => props[name];

  return {
    setAnimateProp,
    getAnimateProp,
    props,
  };
};

export default useProvideAnimate;
