// src/types/home.ts
export interface Stat {
    id: number;
    content: string | JSX.Element;
}

export interface ListItem {
    text: string;
    count?: number;
}

export interface ButtonOption {
    label: string;
    value: string;
}

export interface VitalRecorderVersion {
    os: ButtonOption[];
    version: ButtonOption[];
    downloadCount: number;
    lastUpdate: string;
}