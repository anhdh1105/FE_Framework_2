import api from "../config/axios";
import { DataProduct, IProduct } from "../interfaces/product";
export const GetAllProducts = async () => {
    try {
        const { data } = await api.get("products");
        return data;
    } catch (error) {
        throw new Error("Loi");
    }
};

export const getAllProducts = async (params?: any) => {
    try {
        const { data } = await api.get("products", {
            params,
        });
        return data;
    } catch (error) {
        throw new Error("Loi");
    }
};

interface SearchParams {
    name_like?: string;
    categoryId?: string[];
}

// Example searchProducts function using axios
export const searchProducts = async (params: SearchParams): Promise<IProduct[]> => {
    try {
        // Construct query string from parameters
        const queryParams = new URLSearchParams();
        if (params.name_like) {
            queryParams.append("name_like", params.name_like);
        }
        if (params.categoryId && params.categoryId.length > 0) {
            params.categoryId.forEach((id) => queryParams.append("categoryId", id));
        }

        const response = await api.get<IProduct[]>(`products?${queryParams.toString()}`);

        // Return the list of products
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const GetProductByID = async (id: number | string, params?: any) => {
    try {
        const { data } = await api.get(`products/${id}`, {
            params,
        });
        return data;
    } catch (error) {
        throw new Error("Loi");
    }
};
export const Add = async (productData: DataProduct) => {
    try {
        const { data } = await api.post(`products`, productData);
        return data;
    } catch (error) {
        throw new Error("Loi");
    }
};
export const UpdateProduct = async (productData: DataProduct, id: number | string) => {
    try {
        const { data } = await api.put(`products/${id}`, productData);
        return data;
    } catch (error) {
        throw new Error("Loi");
    }
};
export const DeleteProductById = async (id: number | string) => {
    try {
        const { data } = await api.delete(`products/${id}`);
        return data;
    } catch (error) {
        throw new Error("Loi");
    }
};
