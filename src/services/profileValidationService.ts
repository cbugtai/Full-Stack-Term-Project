import { banned } from "./bannedWords";

export const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string) =>
    /^\+?[0-9]{7,15}$/.test(phone);

export const isStrongPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

export const isValidUsername = (username: string) =>
    /^[a-zA-Z0-9_]{3,20}$/.test(username);

export const isValidBio = (bio: string) =>
    bio.length > 0 && bio.length <= 500;

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