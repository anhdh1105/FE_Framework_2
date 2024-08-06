import { IProduct } from "./product";

export interface ICategories {
    id: string;
    name: string;
    image: string;
    products:IProduct[];
}
export type DataCategory = Pick<ICategories, "name" | "image">;
