import { Link, useParams } from "react-router-dom";
import ListReview from "./ListReview";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product";
import { GetProductByID } from "../../services/product";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../../main";

const ProductDetailPage = () => {

  const api = axios.create({
    baseURL: "http://localhost:3000",
  });
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState<IProduct | null>();

  const [quantity, setQuantity] = useState(1);

  const isLogged = localStorage.getItem('token');
  const userInfo = JSON.parse(
    localStorage.getItem('user') as string
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const checkCart = await api.get("/carts", {
        params: {
          userId: userInfo.id,
        },
      });

      let cartId;
      if (!checkCart.data.length) {
        const addCart = await api.post("/carts", {
          userId: userInfo.id,
        });

        cartId = addCart.data.id;
      } else {
        cartId = checkCart.data[0].id;
      }

      // kiểm tra giỏ hàng có sp chưa
      const checkProduct = await api.get("/cartItems", {
        params: {
          cartId,
          productId,
        },
      });

      // nếu đã tồn tại sp
      if (checkProduct.data.length) {
        const cartItemId = checkProduct.data[0].id;
        const currQnt = checkProduct.data[0].quantity;
        // cập nhật số lượng
        await api.put(`/cartItems/${cartItemId}`, {
          ...checkProduct.data[0],
          quantity: currQnt + quantity,
        });
      } else {
        // thêm sp vào giỏ
        await api.post("/cartItems", {
          cartId,
          productId,
          quantity,
        });
      }

      return Promise.resolve();
    },
    onSuccess: () => {
      alert('Thêm sản phẩm thành công')
      queryClient.invalidateQueries({ queryKey: ["CART"] });
      setQuantity(1);
    },
  });

  useEffect(() => {
    productId && fetchProduct(productId);
  }, [productId]);

  const onAddCart = () => {
    if (!isLogged) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
    }

    mutation.mutate();
  };

  useEffect(() => {
    productId && fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      const data = await GetProductByID(id, {
        _expand: "category",
      });
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto px-3 mt-24">
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <div className="flex mb-12">
            <img
              src={product?.image}
              alt="Image"
              className="size-[355px] m-auto"
            />
          </div>

          <div className="flex gap-x-6">
            <img
              src={product?.image}
              alt="Image"
              className="block size-24 object-contain border border-[#000000] p-2 rounded-lg"
            />
            <img
              src={product?.image}
              alt="Image"
              className="block size-24 object-contain border border-transparent p-2 rounded-lg"
            />
            <img
              src={product?.image}
              alt="Image"
              className="block size-24 object-contain border border-transparent p-2 rounded-lg"
            />
          </div>
        </div>

        <div>
          <Link to="" className="uppercase font-bold text-[#4E7C32] text-sm">
            {product?.categoryId}
          </Link>

          <h1 className="mt-5 mb-6 text-[#1D2025] font-bold text-[44px]">
            {product?.name}
          </h1>

          <p className="font-medium text-[#68707D]">
            {product?.description}
          </p>

          <div className="flex items-center gap-x-4 mt-8">
            <p className="font-bold text-3xl text-[#1D2025]">$125.00</p>

            <button className="rounded px-3 py-1 bg-[#FFEDE0] font-bold text-[#505F4E]">
              50%
            </button>
          </div>

          <p className="mt-3 text-[#1D2025] font-bold line-through">$250.00</p>

          <div className="mt-4 flex gap-x-4">
            <div className="rounded-lg bg-[#F7F8FD] h-12 flex items-center">
              <button
                className="text-[#505F4E] px-4"
                onClick={() => {
                  const qnt = quantity - 1;
                  setQuantity(qnt > 0 ? qnt : 1);
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>

              <input
                type="text"
                value={quantity}
                className="bg-transparent text-center w-14 outline-none"
                readOnly
              />

              <button
                className="text-[#505F4E] px-4"
                onClick={() => setQuantity(quantity + 1)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <div
              onClick={onAddCart}
              className="flex items-center w-[273px] max-w-full rounded-lg bg-[#4E7C32] justify-center gap-x-3 text-white font-bold cursor-pointer"
            >
              <div>
                <i className="fa-solid fa-cart-shopping"></i>
              </div>

              <p>Thêm vào giỏ hàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-28">
        <div className="mb-6">
          <p className="text-3xl text-[#4E7C32]">Description</p>

          <p className="text-lg text-[#665345] font-light leading-7 mt-2">
            {product?.description}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-3xl text-[#4E7C32]">About</p>

          <p className="text-lg text-[#665345] font-light leading-7 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled i
          </p>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-4">
        <div>
          <div className="flex gap-x-4 items-center">
            <img
              src={product?.image}
              alt="Image"
              className="block size-[183px]"
            />

            <div>
              <div className="flex items-center">
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="text-3xl text-gray-700">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <p className="mt-2 text-center">
                <span className="text-3xl text-[#4E7C32]">5.0</span>
                <span className="text-lg text-[#00000099]"> (388)</span>
              </p>
            </div>
          </div>

          <div className="mt-11 mb-14">
            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">1</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="rounded-[2px] bg-[#A2A0A0] h-[10px] flex-1"></div>

              <p className="text-[#00000099]">(388)</p>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">2</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">3</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">4</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>

            <div className="flex items-center gap-x-3 mb-3">
              <div className="flex items-center gap-x-1">
                <p className="text-xs min-w-2">5</p>

                <div className="text-xs">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>

              <div className="w-16 rounded-[2px] bg-[#D9D9D9] h-[10px]"></div>
            </div>
          </div>
        </div>

        <div>
          <button className="h-9 px-4 flex items-center text-white rounded-xl bg-[#4E7C32] cursor-pointer ml-auto">
            Write reviews
          </button>
        </div>
      </div>

      <ListReview />
    </div>
  );
};

export default ProductDetailPage;