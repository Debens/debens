import React from 'react';

type Child = Exclude<React.ReactNode, boolean | null | undefined>;

export const isElement =
    <Props>(Component: React.ComponentType<Props>) =>
    (element: Child) =>
        React.isValidElement(element) ? element.type === Component : false;

export const isElementName = (Component: string) => (element: Child) =>
    React.isValidElement(element)
        ? typeof element.type === 'string'
            ? element.type === Component
            : element.type.name === Component
        : false;
