import { useContext } from "react";
import { productContext } from "../../context/productContext";
import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/product";

const AllProducts = () => {
    const { products, deleteProduct, categories } = useContext(productContext);

    const getCatName = (categoryId: string) => {
        const category = categories.find((cat: any) => cat.id === categoryId);
        return category ? category.name : "Không xác định";
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center mt-10">Danh Sách Sản Phẩm</h1>
            <div className="overflow-y-auto max-h-[calc(100vh-6rem)] px-4 py-2"> {/* Cập nhật ở đây */}
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-green-500 text-white">
                            <th className="py-3 px-4 text-left">STT</th>
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: IProduct, index: number) => (
                            <tr key={product.id} className="hover:bg-gray-100 border-b">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">
                                    <img src={product.image} width={90} alt={product.name} className="rounded-lg object-cover" />
                                </td>
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4">{product.price}</td>
                                <td className="py-3 px-4">{getCatName(product.categoryId)}</td>
                                <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
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
    );
};

export default AllProducts;