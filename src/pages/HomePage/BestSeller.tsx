import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { IProduct } from "../../interfaces/product";

const BestSeller = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/products');
      setProducts(data);
    })();
  }, []);
  return (
    <>
      <div className="border-b border-[#0000001A] mt-12">
        <h1 className="max-w-[1200px] mx-auto baloo-font text-3xl text-[#505F4E] font-bold px-3">
          Best Sellers
        </h1>
      </div>

      <div className="bg-white mt-2">
        <div className="max-w-[1200px] mx-auto px-3 py-14">
          <div className="grid grid-cols-4 gap-x-12">
            {products.map((product) => (
              <div key={product.id}>
                <Link to={`products/${product.id}`} className="block relative">
                  <img
                    src={product.image}
                    alt="Product image"
                    className="block w-full h-64 object-cover"
                  />


                </Link>

                <div className="mt-6">
                  <Link to="" className="font-semibold text-sm text-[#665345]">
                    {product.name}
                  </Link>

                  <div className="flex justify-between items-center mt-2 text-xs">
                    <p className="text-[#777777]">{product.category}</p>

                    <div className="flex items-center gap-x-4">
                      {/* <p
                        className={classNames("text-[#665345] font-semibold", {
                          "text-[#777777] line-through": product.category,
                        })}
                      >
                        {product.price}
                      </p> */}
                      {product.category && (
                        <p className="text-[#FF6F61] font-semibold">
                          {product.price}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 mt-14 pb-16">
        <div className="flex h-[565px] gap-x-3">
          <div className="w-[452px] relative">
            <img
              src="/images/best-seller-5.jpeg"
              alt="Best seller 5"
              className="h-full w-full block object-cover"
            />

            <div className="absolute top-6 bg-[linear-gradient(91.94deg,rgba(255,255,255,0.5)_0.8%,rgba(255,255,255,0.3815)_63.3%,rgba(255,255,255,0)_98.92%)] right-0 left-0 px-8 py-4">
              <p className="text-[#2B2B2B] font-semibold text-2xl tracking-wider">
                Xẻng làm vườn
              </p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="relative">
              <img
                src="/images/best-seller-6.jpeg"
                alt="Best seller-6"
                className="block w-full h-full object-cover"
              />

              <div className="absolute top-6 bg-[linear-gradient(91.94deg,rgba(255,255,255,0.5)_0.8%,rgba(255,255,255,0.3815)_63.3%,rgba(255,255,255,0)_98.92%)] right-0 left-0 px-4 py-2">
                <p className="text-[#2B2B2B] font-semibold text-2xl tracking-wider">
                  Cát
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/best-seller-7.jpeg"
                alt="Best seller-6"
                className="block w-full h-full object-cover"
              />

              <div className="absolute top-6 bg-[linear-gradient(91.94deg,rgba(255,255,255,0.5)_0.8%,rgba(255,255,255,0.3815)_63.3%,rgba(255,255,255,0)_98.92%)] right-0 left-0 px-4 py-2">
                <p className="text-[#2B2B2B] font-semibold text-2xl tracking-wider lowercase">
                  Giỏ trồng
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/best-seller-8.jpeg"
                alt="Best seller-6"
                className="block w-full h-full object-cover"
              />

              <div className="absolute top-6 bg-[linear-gradient(91.94deg,rgba(255,255,255,0.5)_0.8%,rgba(255,255,255,0.3815)_63.3%,rgba(255,255,255,0)_98.92%)] right-0 left-0 px-4 py-2">
                <p className="text-[#2B2B2B] font-semibold text-2xl tracking-wider lowercase">
                  Bánh bùn
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/best-seller-9.jpeg"
                alt="Best seller-6"
                className="block w-full h-full object-cover"
              />

              <div className="absolute top-6 bg-[linear-gradient(91.94deg,rgba(255,255,255,0.5)_0.8%,rgba(255,255,255,0.3815)_63.3%,rgba(255,255,255,0)_98.92%)] right-0 left-0 px-4 py-2">
                <p className="text-[#2B2B2B] font-semibold text-2xl tracking-wider lowercase">
                  Kẹp ống
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
