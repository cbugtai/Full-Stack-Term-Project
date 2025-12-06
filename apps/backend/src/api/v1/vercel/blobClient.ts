import { put, list } from "@vercel/blob";

const TOKEN = process.env.LISTING_IMAGES_READ_WRITE_TOKEN;

if (!TOKEN) {
    throw new Error("Missing LISTING_IMAGES_READ_WRITE_TOKEN env variable");
}

export const blobClient = {
    upload: async (path: string, content: Buffer | string): Promise<string> => {
        const { url } = await put(path, content, {
            token: TOKEN,
            access: "public",
        });
        return url;
    },

    list: async (prefix?: string) => {
        const result = await list({
            token: TOKEN,
            prefix,
        });
        return result.blobs;
    },
};