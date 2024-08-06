import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { queryClient } from "../../main";
import axios from "axios";
import { ICart } from "../../interfaces/cart";

const Cart = () => {
    const api = axios.create({
        baseURL: "http://localhost:3000",
    });
    const isLogged = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("user") as string);

    const { data, refetch } = useQuery({
        queryKey: ["CART_DATA"],
        queryFn: async () => {
            if (!isLogged) {
                return Promise.resolve([]);
            }
            const carts = await api.get("/carts", {
                params: {
                    userId: userInfo.id,
                },
            });
            if (!carts.data.length) {
                return Promise.resolve([]);
            }

            const cartId = carts.data[0].id;
            const cartItems = await api.get("/cartItems", {
                params: {
                    cartId,
                    _expand: "product",
                },
            });
            return Promise.resolve(cartItems.data);
        },
    });

    const updateQntMutation = useMutation({
        mutationFn: ({
            cartItemId,
            quantity,
        }: {
            cartItemId: number;
            quantity: number;
        }) => {
            return api.patch(`/cartItems/${cartItemId}`, {
                quantity,
            });
        },
        onSuccess: () => {
            refetch();
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: (cartItemId: number) => {
            return api.delete(`/cartItems/${cartItemId}`);
        },
        onSuccess: () => {
            refetch();
            queryClient.invalidateQueries({ queryKey: ["CART"] });
        },
    });

    const totalPrice = useMemo(() => {
        if (!data) {
            return 0;
        }
        return data.reduce((total: number, curr: ICart) => {
            return (total += curr.quantity * curr.product.price);
        }, 0);
    }, [data]);

    if (!data?.length) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-semibold">Không có sản phẩm nào trong giỏ hàng!</p>
            </div>
        );
    }

    return (
        <div className="max-w-screen-lg mx-auto p-4 mt-12">
            <h1 className="text-3xl font-bold text-center mb-6">Thông Tin Giỏ Hàng</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="p-3 text-left">Sản phẩm</th>
                                <th className="p-3 text-left">Đơn giá</th>
                                <th className="p-3 text-center">Số lượng</th>
                                <th className="p-3 text-right">Thành tiền</th>
                                <th className="p-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {data?.map((it: ICart) => (
                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={it.id}>
                                    <td className="p-3 flex items-center">
                                        <img
                                            src={it.product.image}
                                            alt={it.product.name}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                        <div className="ml-4">
                                            <Link
                                                className="font-medium text-lg hover:text-blue-500"
                                                to={`/products/${it.productId}`}
                                            >
                                                {it.product.name}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="p-3">{it.product.price.toLocaleString()} VND</td>
                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button
                                                type="button"
                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                                                onClick={() => {
                                                    const nextQnt = it.quantity - 1;
                                                    nextQnt > 0 &&
                                                        updateQntMutation.mutate({
                                                            quantity: nextQnt,
                                                            cartItemId: it.id,
                                                        });
                                                }}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className="w-10 text-center border rounded focus:outline-none"
                                                readOnly
                                                value={it.quantity}
                                            />
                                            <button
                                                type="button"
                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
                                                onClick={() =>
                                                    updateQntMutation.mutate({
                                                        quantity: it.quantity + 1,
                                                        cartItemId: it.id,
                                                    })
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right">
                                        {(it.quantity * it.product.price).toLocaleString()} VND
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            type="button"
                                            className="text-red-600 hover:text-red-800 transition duration-200"
                                            onClick={() => {
                                                const isConfirm = confirm("Xác nhận xoá sản phẩm?");
                                                isConfirm && deleteProductMutation.mutate(it.id);
                                            }}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className="bg-white p-6 shadow-lg rounded">
                    <h2 className="text-xl font-bold mb-4">Tổng giỏ hàng</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Tạm tính</span>
                        <span className="font-semibold">{totalPrice.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 border-t border-gray-200 pt-2">
                        <span className="text-gray-700">Tổng</span>
                        <span className="font-semibold">{totalPrice.toLocaleString()} VND</span>
                    </div>
                    <Link
                        to="/checkout"
                        className="block w-full text-center py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-200"
                    >
                        Tiến hành thanh toán
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
