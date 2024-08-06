import { useEffect, useState } from "react";
import api from "../../config/axios";
import { ICategories } from "../../interfaces/category";
import { IProduct } from "../../interfaces/product";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategory] = useState<ICategories[]>([]);
  const [products, setProduct] = useState<IProduct[]>([]);
  const [productCounts, setProductCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/products');
      setProduct(data);
    })();
    (async () => {
      const { data } = await api.get('/category');
      setCategory(data);
    })();
  }, []);

  useEffect(() => {
    const countProductsByCategory = () => {
      const counts: Record<string, number> = {};

      products.forEach((product) => {
        if (counts[product.categoryId]) {
          counts[product.categoryId]++;
        } else {
          counts[product.categoryId] = 1;
        }
      });

      setProductCounts(counts);
    };

    if (products.length > 0) {
      countProductsByCategory();
    }
  }, [products]);
  return (
    <>
      <div className="border-b border-[#0000001A] mt-12">
        <h1 className="max-w-[1200px] mx-auto baloo-font text-3xl text-[#505F4E] font-bold px-3">
          Kategorien
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-3 mt-12">
        <div className="grid grid-cols-4 gap-6">
          {categories.map((it) => (
            <div key={it.id} className="relative">
              <img
                src={it.image}
                alt={it.name}
                className="block w-full h-[368px] cursor-pointer"
              />

              <div className="absolute top-6 right-8 z-10">
                <Link to={`/category/${it.id}`} className="font-semibold text-lg text-white">{it.name}</Link>
                <p className="text-white">{productCounts[it.id] || 0} items</p>
              </div>

              <div className="absolute top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.2)] w-full h-full"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
