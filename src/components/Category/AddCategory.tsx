import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { categoryContext } from '../../context/categoryContext'
import { DataCategory } from '../../interfaces/category'



const AddCategory = () => {
  const { addCategory } = useContext(categoryContext)
  const { register, handleSubmit, formState: { errors } } = useForm<DataCategory>()
  const onSubmit = (data: DataCategory) => {
    addCategory(data)
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center mt-5">Thêm Mới Danh Mục</h1>
      <form className="flex flex-col bg-white p-6 rounded-lg shadow-md max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name', { required: true, minLength: 5 })}
          placeholder="Tên danh mục"
          className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {(errors.name) && <span className='text-red-700 text-[12px]'>Tên không để trống và lớn hơn 5 kí tự</span>}
        <input
          type="text"
          {...register('image', { required: true })}
          placeholder="Ảnh danh mục"
          className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {(errors.image) && <span className='text-red-700 text-[12px]'>Ảnh không để trống </span>}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Thêm Mới
        </button>
      </form>
    </>
  )
}

export default AddCategory