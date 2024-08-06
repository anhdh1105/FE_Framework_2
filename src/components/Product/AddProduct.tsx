import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../config/axios';
import { productContext } from '../../context/productContext';
import { ICategories } from '../../interfaces/category';
import { DataProduct } from '../../interfaces/product';



const AddProduct = () => {
    const { onAddProduct } = useContext(productContext);
    const { register, handleSubmit, formState: { errors } } = useForm<DataProduct>()
    const [categories, setCategory] = useState<ICategories[]>([]);
    useEffect(() => {
        (async () => {
            const { data } = await api.get('/category');
            setCategory(data);
        })()
    }, [])
    const onSubmit = (data: DataProduct) => {
        onAddProduct(data);
    }
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center mt-10">Add Product</h1>
            <form className="flex flex-col bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register('name', { required: true, minLength: 6 })}
                    placeholder="Tên sản phẩm"
                    className={`mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                        } focus:border-transparent`}
                />
                {errors.name && <span className="text-red-700 text-sm mb-2">Tên không để trống và lớn hơn 6 kí tự</span>}

                <input
                    type="text"
                    {...register('image', { required: true })}
                    placeholder="Ảnh sản phẩm"
                    className="mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.image && <span className="text-red-700 text-sm mb-4">Ảnh không được để trống</span>}


                <input
                    type="text"
                    {...register('price', { required: true, pattern: /^\d*$/ })}
                    placeholder="Giá"
                    className={`mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.price ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                        } focus:border-transparent`}
                />
                {errors.price && <span className="text-red-700 text-sm mb-2">Giá phải là số và không âm</span>}

                <select
                    {...register('categoryId', { required: true })}
                    className={`mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.categoryId ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                        } focus:border-transparent bg-white`}
                >
                    <option value="" disabled selected>----Select category----</option>
                    {
                        categories.map((category) => (
                            <>
                                <option value={category.id}>{category.name}</option>
                            </>
                        ))
                    }
                </select>
                {errors.categoryId && <span className="text-red-700 text-sm mb-4">Danh mục không được để trống</span>}

                <textarea

                    {...register('description', { required: true })}
                    placeholder="Mô tả sản phẩm"
                    className={`mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${'focus:ring-blue-500'
                        } focus:border-transparent`}
                />
                {errors.description && <span className="text-red-700 text-sm mb-4">Mô tả sản phẩm không được để trống</span>}

                <button
                    type="submit"
                    className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-g-600 transition duration-300 ease-in-out"
                >
                    Add
                </button>
            </form>
        </>
    )
}

export default AddProduct;