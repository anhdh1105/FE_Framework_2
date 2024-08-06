import React, { createContext, useEffect, useState } from 'react'
import { DataCategory, ICategories } from '../interfaces/category';
import { AddCategory, DeleteCategoryById, GetAllCategory, UpdateCategory } from '../services/category';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}

export const categoryContext = createContext({} as any);
const CategoryContext = ({ children }: Props) => {
    const [categories, setCategory] = useState<ICategories[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const data = await GetAllCategory()
            setCategory(data)
        })()
    }, [])

    const addCategory = async (data: DataCategory) => {
        try {
            const category = await AddCategory(data);
            alert('Thêm mới thành công')
            setCategory([...categories, category])
            navigate('/admin/category');
        } catch (error) {

        }
    }

    const deleteCategory = async (id: string) => {
        if (confirm('Ai so thi di ve ?')) {
            try {
                const data = await DeleteCategoryById(id);
                alert("Xoa thanh cong");
                setCategory(categories.filter(category => category.id !== id));
            } catch (error) {
                console.log(error);

            }
        }
    }
    const onUpdateCategory = async (data: DataCategory, id: string) => {
        try {
            const datacat = await UpdateCategory(data, id)
            alert('Cập nhật thành công')
            const newCats = categories.map(category => (category.id == id) ? datacat : category)
            setCategory(newCats)
            navigate('/admin/category')
        } catch (error) {

        }
    }
    return (
        <categoryContext.Provider value={{ addCategory, deleteCategory, onUpdateCategory, categories }}>
            {children}
        </categoryContext.Provider>
    )
}

export default CategoryContext