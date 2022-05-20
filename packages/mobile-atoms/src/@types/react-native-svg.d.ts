declare module '*.svg' {
    import { SvgProps } from 'react-native-svg';

    const component: React.ComponentType<SvgProps>;
    export default component;
}
