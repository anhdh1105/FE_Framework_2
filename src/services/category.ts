import api from "../config/axios";
import { DataCategory } from "../interfaces/category";

export const GetAllCategory = async (params?: any) => {
    try {
        const { data } = await api.get("category",{params});
        return data;
    } catch (error) {
        throw new Error("lỗi");
    }
};
export const GetCategoryByID = async (id: string | any) => {
    try {
        const { data } = await api.get(`category/${id}`);
        return data;
    } catch (error) {
        throw new Error("lỗi");
    }
};
export const AddCategory = async (categoryData: DataCategory) => {
    try {
        const { data } = await api.post(`category`, categoryData);
        return data;
    } catch (error) {
        throw new Error("lỗi");
    }
};
export const UpdateCategory = async (categoryData: DataCategory, id: string) => {
    try {
        const { data } = await api.put(`category/${id}`, categoryData);
        return data;
    } catch (error) {
        throw new Error("lỗi");
    }
};
export const DeleteCategoryById = async (id: string) => {
    try {
        const { data } = await api.delete(`category/${id}`);
        return data;
    } catch (error) {
        throw new Error("lỗi");
    }
};
