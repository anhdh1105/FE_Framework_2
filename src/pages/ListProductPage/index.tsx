import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem";
import { ICategories } from "../../interfaces/category";
import { IProduct } from "../../interfaces/product";
import { GetAllCategory } from "../../services/category";
import { getAllProducts } from "../../services/product";

const ListProductPage = () => {
  const params = useParams<{ categoryId?: string }>();
  const categoryId = params.categoryId;
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || "");
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {

    setSelectedCategory(categoryId || "");
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts(selectedCategory ? { categoryId: selectedCategory } : {});
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await GetAllCategory();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate(`/category/${categoryId}`);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  return (
    <>
      <div className="product-header py-16">
        <div className="max-w-[1200px] mx-auto px-3">
          <h1 className="baloo-font text-[#505F4E] font-bold text-3xl">
            Töpfe & Behälter
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex gap-x-14 mt-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`rounded px-3 py-2 bg-[#D2E8CD] flex items-center gap-x-2 cursor-pointer ${selectedCategory === category.id ? "bg-[#B5D6B2]" : ""
                }`}
              onClick={() => handleCategoryClick(category.id)} // Gọi hàm handleCategoryClick khi click vào danh mục
            >
              <img
                src={category.image}
                alt="Thumbnail"
                className="block h-12 object-contain"
              />
              <p className="font-medium text-[#665345]">{category.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 flex gap-x-8">
          <div className="flex-1">
            <div className="flex gap-x-8">
              <div className="flex items-center gap-x-3">
                <p className="text-lg text-[#333333]">Sort By:</p>

                <select
                  name=""
                  id=""
                  className="rounded border border-[#BDBDBD] px-3 py-1.5 w-52 outline-none text-[#BDBDBD]"
                >
                  <option value="Newest">Newest</option>
                </select>
              </div>

              <div className="flex items-center gap-x-3">
                <p className="text-lg text-[#333333]">Show:</p>

                <select
                  name=""
                  id=""
                  className="rounded border border-[#BDBDBD] px-3 py-1.5 w-52 outline-none text-[#BDBDBD]"
                  onChange={(e) => setSelectedCategory(e.target.value)} // Cập nhật selectedCategory khi thay đổi
                >
                  <option value="">All</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-3 gap-y-14 my-12">
              {filteredProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>

          <div className="w-60">
            <p className="baloo-font text-3xl text-[#505F4E] font-bold">
              Kategorien
            </p>

            <ul className="mt-7">
              {categories.map((category) => (
                <li key={category.id} className="flex items-center gap-x-2 mb-3">
                  <input
                    type="checkbox"
                    name="category"
                    id={`category-${category.id}`}
                    checked={selectedCategory === category.id}
                    onChange={() =>
                      setSelectedCategory(
                        selectedCategory === category.id ? "" : category.id
                      )
                    }
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="cursor-pointer select-none"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>

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
              <div className="filter_bar">
                <div className="filter_bar p-6 rounded max-w-sm w-full ">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Filter By Price</h2>
                    <input type="range" className="w-full" min="0" max="8000" />
                    <div className="flex items-center justify-between text-gray-600 text-sm mt-2">
                      <span>From $0 to $8000</span>
                      <span className="font-medium cursor-pointer">Filter</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Filter By Size</h2>
                    <input type="range" className="w-full" min="2" max="50" />
                    <div className="flex items-center justify-between text-gray-600 text-sm mt-2">
                      <span>2 mm by 50</span>
                      <span className="font-medium cursor-pointer">Filter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProductPage;
