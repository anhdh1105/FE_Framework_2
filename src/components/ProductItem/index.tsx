import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/product";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div>
      <div className="relative group overflow-hidden">
        <button className="absolute top-0 text-white text-sm rounded bg-[#505F4E] px-3 py-0.5 left-12">
          Sell
        </button>
        <img
          src={product.image}
          alt="Product-1"
          className="block w-full h-[200px] object-cover mt-8"
        />
        <div className="absolute group-hover:top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center gap-x-3 top-[110%] transition-all linear duration-200">
          <div className="h-9 w-10 flex items-center justify-center bg-white rounded shadow text-[#4E7C32] cursor-pointer hover:bg-[#4E7C32] hover:text-white transition-all">
            <i className="fa-solid fa-rotate"></i>
          </div>
          <div className="h-9 w-10 flex items-center justify-center bg-white rounded shadow text-[#4E7C32] cursor-pointer hover:bg-[#4E7C32] hover:text-white transition-all">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="h-9 w-10 flex items-center justify-center bg-white rounded shadow text-[#4E7C32] cursor-pointer hover:bg-[#4E7C32] hover:text-white transition-all">
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link to={`/products/${product.id}`} className="text-[#333333] font-bold">
          {product.name}
        </Link>
        <div className="flex items-center gap-x-3 mt-2">
          <p className="text-[#505F4E] text-sm">${product.price}</p>
          <p className="text-sm text-[#828282] font-bold">{product.categoryId}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;