import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
    const ReanimatedMock = require('react-native-reanimated/mock');
    const Reanimated = jest.requireActual('react-native-reanimated');

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    ReanimatedMock.default.call = () => {};

    return Object.assign(ReanimatedMock, {
        SlideInRight: Reanimated.SlideInRight,
        SlideOutRight: Reanimated.SlideOutRight,
        SlideInUp: Reanimated.SlideInUp,
        SlideInDown: Reanimated.SlideInDown,
        SlideOutUp: Reanimated.SlideOutUp,
        SlideOutDown: Reanimated.SlideOutDown,
        FadeIn: Reanimated.FadeIn,
        FadeInRight: Reanimated.FadeInRight,
        FadeInLeft: Reanimated.FadeInLeft,
        FadeInUp: Reanimated.FadeInUp,
        FadeInDown: Reanimated.FadeInDown,
        FadeOut: Reanimated.FadeOut,
        FadeOutRight: Reanimated.FadeOutRight,
        FadeOutLeft: Reanimated.FadeOutLeft,
        FadeOutUp: Reanimated.FadeOutUp,
        FadeOutDown: Reanimated.FadeOutDown,
        SlideOutLeft: Reanimated.SlideOutLeft,
        SlideInLeft: Reanimated.SlideInLeft,
        ZoomIn: Reanimated.ZoomIn,
        ZoomInRotate: Reanimated.ZoomInRotate,
        ZoomInRight: Reanimated.ZoomInRight,
        ZoomInLeft: Reanimated.ZoomInLeft,
        ZoomInUp: Reanimated.ZoomInUp,
        ZoomInDown: Reanimated.ZoomInDown,
        ZoomInEasyUp: Reanimated.ZoomInEasyUp,
        ZoomInEasyDown: Reanimated.ZoomInEasyDown,
        ZoomOut: Reanimated.ZoomOut,
        ZoomOutRotate: Reanimated.ZoomOutRotate,
        ZoomOutRight: Reanimated.ZoomOutRight,
        ZoomOutLeft: Reanimated.ZoomOutLeft,
        ZoomOutUp: Reanimated.ZoomOutUp,
        ZoomOutDown: Reanimated.ZoomOutDown,
        ZoomOutEasyUp: Reanimated.ZoomOutEasyUp,
        ZoomOutEasyDown: Reanimated.ZoomOutEasyDown,
        StretchInX: Reanimated.StretchInX,
        StretchInY: Reanimated.StretchInY,
        StretchOutX: Reanimated.StretchOutX,
        StretchOutY: Reanimated.StretchOutY,
        FlipInXUp: Reanimated.FlipInXUp,
        FlipInYLeft: Reanimated.FlipInYLeft,
        FlipInXDown: Reanimated.FlipInXDown,
        FlipInYRight: Reanimated.FlipInYRight,
        FlipInEasyX: Reanimated.FlipInEasyX,
        FlipInEasyY: Reanimated.FlipInEasyY,
        FlipOutXUp: Reanimated.FlipOutXUp,
        FlipOutYLeft: Reanimated.FlipOutYLeft,
        FlipOutXDown: Reanimated.FlipOutXDown,
        FlipOutYRight: Reanimated.FlipOutYRight,
        FlipOutEasyX: Reanimated.FlipOutEasyX,
        FlipOutEasyY: Reanimated.FlipOutEasyY,
        BounceIn: Reanimated.BounceIn,
        BounceInDown: Reanimated.BounceInDown,
        BounceInUp: Reanimated.BounceInUp,
        BounceInLeft: Reanimated.BounceInLeft,
        BounceInRight: Reanimated.BounceInRight,
        BounceOut: Reanimated.BounceOut,
        BounceOutDown: Reanimated.BounceOutDown,
        BounceOutUp: Reanimated.BounceOutUp,
        BounceOutLeft: Reanimated.BounceOutLeft,
        BounceOutRight: Reanimated.BounceOutRight,
        LightSpeedInRight: Reanimated.LightSpeedInRight,
        LightSpeedInLeft: Reanimated.LightSpeedInLeft,
        LightSpeedOutRight: Reanimated.LightSpeedOutRight,
        LightSpeedOutLeft: Reanimated.LightSpeedOutLeft,
        PinwheelIn: Reanimated.PinwheelIn,
        PinwheelOut: Reanimated.PinwheelOut,
        RotateInDownLeft: Reanimated.RotateInDownLeft,
        RotateInDownRight: Reanimated.RotateInDownRight,
        RotateInUpRight: Reanimated.RotateInUpRight,
        RotateInUpLeft: Reanimated.RotateInUpLeft,
        RotateOutDownRight: Reanimated.RotateOutDownRight,
        RotateOutDownLeft: Reanimated.RotateOutDownLeft,
        RotateOutUpLeft: Reanimated.RotateOutUpLeft,
        RotateOutUpRight: Reanimated.RotateOutUpRight,
        RollInLeft: Reanimated.RollInLeft,
        RollInRight: Reanimated.RollInRight,
        RollOutLeft: Reanimated.RollOutLeft,
        RollOutRight: Reanimated.RollOutRight,
    });
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
