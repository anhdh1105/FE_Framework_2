export interface IProduct {
    id: string | number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: any;
    categoryId: any;
}
export type DataProduct = Pick<IProduct, "name" | "price" | "category" | "image" | "description" | "categoryId">;
