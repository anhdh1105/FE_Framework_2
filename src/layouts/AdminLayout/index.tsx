import { Link, Outlet } from "react-router-dom";
import { FaTachometerAlt, FaTags, FaPlus, FaBox, FaUsers } from "react-icons/fa";

const AdminLayout = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <aside className="w-80 bg-green-700 text-white">
                <header className="py-6 mb-4 text-center bg-green-800 shadow-md">
                    <Link
                        to="/"
                        className="text-2xl font-bold hover:text-green-300 transition duration-200"
                    >
                        Change to Client
                    </Link>
                </header>

                <ul className="px-4 space-y-2">
                    <li className="py-2 hover:bg-green-600 rounded transition duration-150">
                        <Link to="/admin" className="flex items-center space-x-3 px-4">
                            <FaTachometerAlt className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="py-2 hover:bg-green-600 rounded transition duration-150">
                        <Link to="/admin/category" className="flex items-center space-x-3 px-4">
                            <FaTags className="w-5 h-5" />
                            <span>Danh mục</span>
                        </Link>
                    </li>
                    <li className="py-2 hover:bg-green-600 rounded transition duration-150">
                        <Link to="/admin/category/add" className="flex items-center space-x-3 px-4">
                            <FaPlus className="w-5 h-5" />
                            <span>Thêm Danh mục</span>
                        </Link>
                    </li>
                    <li className="py-2 hover:bg-green-600 rounded transition duration-150">
                        <Link to="/admin/products" className="flex items-center space-x-3 px-4">
                            <FaBox className="w-5 h-5" />
                            <span>Sản phẩm</span>
                        </Link>
                    </li>
                    <li className="py-2 hover:bg-green-600 rounded transition duration-150">
                        <Link to="/admin/products/add" className="flex items-center space-x-3 px-4">
                            <FaPlus className="w-5 h-5" />
                            <span>Thêm Sản phẩm</span>
                        </Link>
                    </li>
                </ul>
            </aside>

            <div className="flex-1 flex flex-col">
                <div className="flex justify-end py-3 shadow px-4 items-center gap-x-2 bg-white">
                    <img
                        src="https://picsum.photos/100/100"
                        alt="Avatar"
                        className="w-10 h-10 object-cover rounded-full border-2 border-green-600"
                    />
                    <p className="font-medium">{user?.email || "admin@example.com"}</p>
                </div>

                <div className="flex-1 overflow-auto p-6 bg-white">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
