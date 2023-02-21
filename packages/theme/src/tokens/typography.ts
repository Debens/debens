export enum FontFamily {
    Unknown = '',
}

export enum FontSize {
    Small = 12,
    Large = 24,
}

export enum LineHeight {
    Small = '12px',
    Large = '24px',
}

export enum FontWeightToken {
    Light = 'light',
    Normal = 'normal',
    Bold = 'bold',
}

export enum FontWeight {
    Light = 400,
    Normal = 600,
    Bold = 800,
}

export interface TypeSet {
    fontFamily: FontFamily;
    fontSize: FontSize;
    lineHeight: LineHeight;
    fontWeight: FontWeight;
}

export enum TypographyToken {
    Body = '$body',
    Heading = '$heading',
}
