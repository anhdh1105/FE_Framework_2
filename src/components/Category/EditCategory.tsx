import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { categoryContext } from "../../context/categoryContext";
import { DataCategory } from "../../interfaces/category";
import { GetCategoryByID } from "../../services/category";


const EditCategory = () => {
    const { onUpdateCategory } = useContext(categoryContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<DataCategory>();
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            try {
                const category = await GetCategoryByID(id as string)
                reset({
                    name: category.name,
                    image: category.image,
                })
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id, reset]);
    const onSubmit = (data: DataCategory) => {
        onUpdateCategory(data, id as string)
    }
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center mt-10">Update Category</h1>
            <form className="flex flex-col bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register('name', { required: true, minLength: 6 })}
                    placeholder="Tên sản phẩm"
                    className={`mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                        } focus:border-transparent`}
                />
                {errors.name && <span className="text-red-700 text-sm mb-2">Tên không để trống và lớn hơn 5 kí tự</span>} 
                 <input
                    type="text"
                    {...register('image', { required: true })}
                    placeholder="Ảnh sản phẩm"
                    className={`mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.image ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                        } focus:border-transparent`}
                />
                {errors.name && <span className="text-red-700 text-sm mb-2">Ảnh không để trống </span>}



                <button
                    type="submit"
                    className="bg-green-500 text-white py-3 px-4 rounded-lg green:bg-blue-600 transition duration-300 ease-in-out"
                >
                    Update Category
                </button>
            </form>

        </>
    )
}

export default EditCategory