import React from 'react';

type Child<P = any> = React.ReactNode | React.JSXElementConstructor<P>;

export const isElement =
    <Props>(Component: React.JSXElementConstructor<Props>) =>
    (element: Child) =>
        React.isValidElement(element) ? element.type === Component : false;

export const isElementName =
    <Props = any>(Component: string) =>
    (element: Child<Props>) =>
        React.isValidElement(element)
            ? typeof element.type === 'string'
                ? element.type === Component
                : element.type.name === Component
            : false;
