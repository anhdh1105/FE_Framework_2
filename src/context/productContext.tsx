import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Add, DeleteProductById, GetAllProducts, UpdateProduct } from '../services/product';
import { DataProduct, IProduct } from '../interfaces/product';
import api from '../config/axios';
import { ICategories } from '../interfaces/category';

type Props = {
    children: React.ReactNode;
}

export const productContext = createContext({} as any);

const ProductContext = ({ children }: Props) => {
    const [products, setProduct] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategories[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const data = await GetAllProducts()
                setProduct(data)
            } catch (error) {

            }
        })()
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/category');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [])


    const deleteProduct = async (id: string | number) => {
        if (confirm('Ai so thi di ve ?')) {
            try {
                const data = await DeleteProductById(id);
                alert("Xoa thanh cong");
                setProduct(products.filter(product => product.id !== id));
            } catch (error) {
                console.log(error);

            }
        }
    }
    const onAddProduct = async (data: DataProduct) => {
        try {
            const product = await Add(data);
            alert('Added');
            setProduct([...products, product]);
            navigate('/admin/products')
        } catch (error) {

        }
    }
    const onUpdate = async (data: DataProduct, id: number | string) => {
        try {
            const dataproduct = await UpdateProduct(data, id)
            alert('Cập nhật thành công')
            const newproducts = products.map(product => (product.id == id) ? dataproduct : product)
            setProduct(newproducts)
            navigate('/admin/products')
        } catch (error) {

        }
    }
    return (
        <productContext.Provider value={{ products, categories, onUpdate, onAddProduct, deleteProduct }}>
            {children}
        </productContext.Provider>
    )
}

export default ProductContext