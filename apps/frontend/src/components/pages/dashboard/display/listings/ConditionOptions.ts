export const ConditionOptions = [
    "New",
    "Open box",
    "Like new",
    "Refurbished",
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Used",
    "Used with cosmetic damage",
    "Used with functional issues",
    "For parts not working",
    "Not Specified"
] as const;

export type Condition = typeof ConditionOptions[number];