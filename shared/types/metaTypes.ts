export type Brand = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Status = {
    id: number;
    name: string;
};

export type Condition = {
    id: number;
    name: string;
};

export type MetaOption = Brand | Category | Status | Condition;