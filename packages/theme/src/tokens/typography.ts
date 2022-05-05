export enum FontFamily {
    Unknown = "// TODO: unknown",
}

export enum FontSize {
    Small = 12,
}

export enum LineHeight {
    Small = 12,
}

export enum FontWeight {
    Normal = 600,
}

export interface TypeSet {
    family: FontFamily;
    size: FontSize;
    height: LineHeight;
    weight: FontWeight;
}

export enum TypographyToken {
    Body = "$body",
    Heading = "$heading",
}
