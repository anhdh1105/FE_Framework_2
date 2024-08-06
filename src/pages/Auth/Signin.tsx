import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

type Inputs = {
    email: string;
    password: string;
};

const api = axios.create({
    baseURL: "http://localhost:3000",
});

const Signin = () => {
    const { mutate } = useMutation({
        mutationFn: (data: Inputs) => {
            return api.post("/signin", data);
        },
        onSuccess: (r) => {
            localStorage.setItem("user", JSON.stringify(r.data?.user));
            localStorage.setItem("token", r.data.accessToken);
            alert("Đăng nhập thành công !");
            window.location.href = "/";
        },
        onError: (error: any) => {
            alert("Lỗi đăng nhập, vui lòng thử lại");
            console.log(error);
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (values) => {
        mutate(values);
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm00MjItMDQ3LWtxOTJ3eDl5LmpwZw.jpg')`, // Example image URL
            }}
        >
            <div className="bg-opacity-20 bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
                <h1 className="text-2xl font-semibold text-center uppercase mb-6">
                    Đăng nhập
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block">
                            Email
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            {...register("email", {
                                required: "Vui lòng nhập email",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Email không đúng định dạng",
                                },
                            })}
                            placeholder="Nhập email"
                            className="px-3 py-2 border mt-1 w-full outline-none transition-all focus:border-[#053d29] rounded"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block">
                            Mật khẩu
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Vui lòng nhập mật khẩu",
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu ít nhất 6 kí tự",
                                },
                            })}
                            placeholder="Nhập mật khẩu"
                            className="px-3 py-2 border mt-1 w-full outline-none transition-all focus:border-[#053d29] rounded"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button className="w-full h-12 text-white font-medium uppercase transition-all bg-[#246c19] hover:bg-[#053d29] rounded">
                        Đăng nhập
                    </button>

                    <div className="flex justify-center gap-x-1 mt-4">
                        <p>Bạn chưa có tài khoản?</p>
                        <Link to="/signup" className="text-[#4e7c32]">
                            Đăng ký
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;