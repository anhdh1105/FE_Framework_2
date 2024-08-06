import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    const isManager = true;

    return (
        <>
            {isManager ? (
                <p>Trang quản lý website</p>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default Dashboard;