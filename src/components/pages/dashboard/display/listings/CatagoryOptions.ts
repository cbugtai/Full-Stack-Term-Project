export const CategoryOptions = [
    "Electronics",
    "Phones",
    "Computers",
    "Tech Accessories",
    "Text Books",
    "Fiction Books",
    "Furniture",
    "Home Decor",
    "Appliances",
    "Vehicles",
    "Vehicle Parts",
    "Clothes",
    "Shoes",
    "Bags",
    "Sports Gear",
    "Musical Instruments",
    "Art Supplies",
    "Toys",
    "Baby Items",
    "Pet Supplies",
    "Services",
    "Others"
] as const;

export type Category = typeof CategoryOptions[number];