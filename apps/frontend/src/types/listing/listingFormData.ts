export type ListingFormData = {
    title: string;
    description: string;
    price: number;
    categoryId: number;
    conditionId: number;
    brandId: number;
    city: string;
    image: File | null;
    isNegotiable: boolean;
    isFree: boolean;
};