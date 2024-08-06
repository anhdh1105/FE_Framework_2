import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { categoryContext } from '../../context/categoryContext';
import { ICategories } from '../../interfaces/category';


const AllCategory = () => {
  const { categories, deleteCategory } = useContext(categoryContext);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center mt-10">Danh Sách Danh Mục</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="py-3 px-4 text-left">STT</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: ICategories, index: number) => (
              <tr key={category.id} className="hover:bg-gray-100 border-b">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4"><img width={90} src={category.image} alt="" /></td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/category/edit/${category.id}`}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default AllCategory