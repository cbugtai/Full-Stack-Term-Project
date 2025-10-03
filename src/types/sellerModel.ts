export type Seller = {
    id: number;             //unique seller ID
    username: string;       //username
    rating: number;         //trustworthiness rating out of 100
    completed_sales: number //total number of sales completed
    photo?: string;         //image/avatar link
}