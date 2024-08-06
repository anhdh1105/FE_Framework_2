
const DefaultAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Welcome, Admin!
                </h1>
                <p className="text-lg text-gray-700">
                    Trang quản lý website của Admin{" "}
                    <span className="font-semibold text-green-600">
                        {user?.name || "Anonymous"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default DefaultAdmin;
