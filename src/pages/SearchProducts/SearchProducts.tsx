import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import api from "../../config/axios";
import { IProduct } from "../../interfaces/product";

const SearchProductsPage = () => {

  const [products, setProducts] = useState<IProduct[]>([]);


  let [search] = useSearchParams();
  const [keyword, setKeywords] = useState<string>('');
  useEffect(() => {
    console.log(search.get('keyword'));
    (async () => {
      const { data } = await api.get('products?name_like=' + search.get('keyword'));
      setProducts(data)
      console.log("data", data);
      setKeywords(search.get('keyword') as string)
    })()
    console.log(products);

  }, [search])
  return (
    <div className="max-w-[1200px] mx-auto px-3">
      <div className="flex gap-x-14 mt-8">
        <div className="product-header py-5">
          <div className="max-w-[1200px] mx-auto px-3">
            <h1 className="baloo-font text-[#505F4E] font-bold text-3xl">
              Kết quả tìm kiếm cho : <strong>{keyword}</strong>
            </h1>
          </div>
        </div>
      </div>

      <div className=" flex gap-x-8">
        <div className="flex-1">
          <div className="flex gap-x-8">

          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-14 my-12">
            {products.map((it) => (
              <ProductItem key={it.id} product={it} />
            ))}
          </div>
        </div>

        <div className="w-60">
          <p className="baloo-font text-3xl text-[#505F4E] font-bold">
            Kategorien
          </p>



          <div className="h-[260px] relative mt-8">
            <img
              src="/images/sidebar.jpeg"
              alt="Image"
              className="block w-full h-full object-cover"
            />

            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#0A0A0A66] pt-8 pb-6 pl-6 flex flex-col justify-between">
              <p className="text-lg font-bold text-white tracking-wide">
                Grow your own favourite plant
              </p>

              <div className="flex items-center text-white gap-x-2">
                <p>Shop Now</p>

                <div className="rounded-full size-5 border-white border-2 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchProductsPage;