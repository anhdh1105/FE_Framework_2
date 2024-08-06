import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

type Inputs = {
    name: string;
    email: string;
    password: string;
};

const api = axios.create({
    baseURL: "http://localhost:3000",
});

const Signup = () => {
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: (data: Inputs) => {
            return api.post("/register", data);
        },
        onSuccess: () => {
            alert("Đăng ký thành công !");
            navigate("/signin");
        },
        onError: (error: any) => {
            alert("Lỗi đăng ký, vui lòng thử lại");
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
            <div className=" bg-opacity-20 bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
                <h1 className="text-2xl font-semibold text-center uppercase mb-6">
                    Đăng ký
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block">
                            Họ tên
                            <span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", {
                                required: "Vui lòng nhập họ tên",
                            })}
                            placeholder="Nhập họ tên"
                            className="px-3 py-2 border mt-1 w-full outline-none transition-all focus:border-[#053d29] rounded"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

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
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
                                    message: "Mật khẩu tối thiểu 6 ký tự",
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

                    <button className="w-full h-12 text-white font-medium uppercase transition-all bg-[#4e7c32] hover:bg-[#053d29] rounded">
                        Đăng ký
                    </button>

                    <div className="flex justify-center gap-x-1 mt-4">
                        <p>Bạn đã có tài khoản?</p>
                        <Link to="/signin" className="text-[#4e7c32]">
                            Đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;