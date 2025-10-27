import { banned } from "./bannedWords";

export const isValidTitle = (title: string) =>
    title.length >= 3 && title.length <= 100;

export const isValidDescription = (desc: string) =>
    desc.length >= 10 && desc.length <= 1000;

export const isValidPrice = (price: number) => {
    const withinRange = price >= 0 && price <= 1000000;
    const hasTwoDecimals = /^\d+(\.\d{1,2})?$/.test(price.toString());
    return withinRange && hasTwoDecimals;
};

export const isValidCity = (city: string) =>
    /^[a-zA-Z\s\-]{2,50}$/.test(city);

function escapeRegex(word: string) {
    return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const containsProfanity = (text: string) => {
    const lowerText = text.toLowerCase();
    return banned.some(word => {
        const safeWord = escapeRegex(word);
        const regex = new RegExp(`\\b${safeWord}\\b`, "i");
        return regex.test(lowerText);
    });
};