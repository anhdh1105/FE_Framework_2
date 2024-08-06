import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../main";
import { ICart } from "../../interfaces/cart";

type Inputs = {
    name: string;
    phone: string;
    email: string;
    address: string;
    note?: string;
};

const Checkout = () => {
    const api = axios.create({
        baseURL: "http://localhost:3000",
    });
    const navigate = useNavigate();

    const isLogged = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("user") as string);

    const { data } = useQuery({
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

    const mutation = useMutation({
        mutationFn: async (formData: Inputs) => {
            const orderCreated = await api.post("/orders", {
                ...formData,
                totalPrice,
            });

            const addOrderDetailsPromise = data?.map((it: ICart) =>
                api.post("/orderDetails", {
                    orderId: orderCreated.data.id,
                    quantity: it.quantity,
                    product: it.product,
                })
            );

            const removeCartItemsPromise = data?.map((it: ICart) =>
                api.delete(`/cartItems/${it.id}`)
            );

            return Promise.all([addOrderDetailsPromise, removeCartItemsPromise]);
        },
        onSuccess: () => {
            alert("Đã đặt hàng thành công!");
            navigate("/");
            queryClient.invalidateQueries({ queryKey: ["CART"] });
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<Inputs>();

    useEffect(() => {
        reset({
            name: userInfo.name,
            email: userInfo.email,
        });
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (values) => {
        mutation.mutate(values);
    };

    const totalPrice = useMemo(() => {
        if (!data) {
            return 0;
        }

        return data.reduce((total: number, curr: ICart) => {
            return (total += curr.quantity * curr.product.price);
        }, 0);
    }, [data]);

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold uppercase">Tiến hành đặt hàng</h1>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                <div className="lg:col-span-2">
                    <div className="border-b pb-3 mb-6">
                        <h3 className="uppercase text-lg font-semibold text-gray-600">
                            Thông tin thanh toán
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="font-semibold block mb-1">
                                Họ và tên *
                            </label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "Vui lòng nhập họ tên",
                                })}
                                className="w-full border px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Nhập đầy đủ họ tên"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="font-semibold block mb-1">
                                Số điện thoại *
                            </label>
                            <input
                                type="text"
                                {...register("phone", {
                                    required: "Vui lòng nhập số điện thoại",
                                    pattern: {
                                        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                        message: "Số điện thoại không đúng định dạng",
                                    },
                                })}
                                className="w-full border px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Nhập số điện thoại"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="email" className="font-semibold block mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Vui lòng nhập email",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Email không đúng định dạng",
                                    },
                                })}
                                className="w-full border px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="address" className="font-semibold block mb-1">
                                Địa chỉ *
                            </label>
                            <input
                                type="text"
                                {...register("address", {
                                    required: "Vui lòng nhập địa chỉ",
                                })}
                                className="w-full border px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Địa chỉ"
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-6">

                        <label htmlFor="note" className="font-semibold block mb-1">
                            Ghi chú đơn hàng
                        </label>
                        <textarea
                            {...register("note")}
                            className="w-full border px-3 py-2 text-sm shadow-sm rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            placeholder="Ghi chú (tuỳ chọn)"
                            rows={4}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 shadow-lg rounded-md">
                    <h3 className="uppercase text-lg font-semibold text-gray-600 mb-4">
                        Đơn hàng của bạn
                    </h3>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left text-gray-600 text-sm uppercase font-semibold pb-2">
                                    Sản phẩm
                                </th>
                                <th className="text-right text-gray-600 text-sm uppercase font-semibold pb-2">
                                    Tổng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((it: ICart) => (
                                <tr className="border-b" key={it.id}>
                                    <td className="py-3 text-sm text-gray-600">
                                        <p className="text-base font-medium">
                                            {it.product.name} <strong>x {it.quantity}</strong>
                                        </p>
                                    </td>
                                    <td className="py-3 text-right text-sm font-medium">
                                        {(it.product.price * it.quantity).toLocaleString()} VND
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t">
                                <td className="font-semibold text-sm py-3">Tạm tính</td>
                                <td className="font-semibold text-right">
                                    {totalPrice.toLocaleString()} VND
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="font-semibold text-sm py-3">Tổng</td>
                                <td className="font-semibold text-right">
                                    {totalPrice.toLocaleString()} VND
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <button
                        type="submit"
                        className="w-full mt-6 bg-green-700 text-white py-2 rounded-md uppercase font-semibold text-sm transition duration-200 hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        Đặt hàng
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
