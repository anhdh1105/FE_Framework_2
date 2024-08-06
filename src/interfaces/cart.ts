import { IProduct } from "./product";

export interface ICart {
    id: number;
    cartId: number;
    product: IProduct;
    quantity: number;
    productId: string;
}
