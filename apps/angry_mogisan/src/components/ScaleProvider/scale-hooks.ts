import { useContext } from 'react';

import context from './scale-context';

const useScaleContext = () => useContext(context);

export const useFaceScale = () => useScaleContext().scaling;
