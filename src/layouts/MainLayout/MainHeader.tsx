import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = () => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ keyword: string }>();

  const onSearch = ({ keyword }: { keyword: string }) => {
    navigate(`/search/?keyword=${keyword}`);
  };



  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;


  const Signout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    window.location.href = "/";
  };

  return (
    <div className="header-wrapper text-white">
      <div className="max-w-[1200px] mx-auto px-3">
        <div className="py-4 flex items-center border-b border-b-[#E3E3E3]">
          <form
            onSubmit={handleSubmit(onSearch)}
            className="flex items-center bg-white px-2 rounded py-2 w-96 max-w-full ml-28"
          >
            <input
              type="text"
              {...register("keyword")}
              placeholder="Tìm kiếm theo sản phẩm, nhãn hiệu và hơn thế nữa"
              className="[&::placeholder]:text-sm outline-none border-none w-full text-black text-sm"
            />

            <div className="text-black px-2 cursor-pointer">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </form>

          <div className="flex items-center ml-auto gap-x-14">
            <select
              name=""
              id=""
              className="bg-transparent text-white outline-none"
            >
              <option value="en">En</option>
              <option value="vi">Vi</option>
            </select>

            <div className="flex items-center gap-x-6">
              <Link to={user ? '/admin' : "/signin"} className="flex items-center gap-x-2">
                <div className="text-2xl">
                  <i className="fa-regular fa-user"></i>
                </div>
                <p>{user ? `Hi, ${user.name}` : "Account"}</p>
                <p className="cursor-pointer" onClick={Signout}>{user ? <i className="fa fa-sign-out"></i> : ''}</p>
              </Link>

              <Link to="/cart" className="flex items-center gap-x-2">
                <div className="text-2xl relative">
                  <i className="fa-solid fa-cart-shopping"></i>


                </div>
                <p>Cart</p>
              </Link>
            </div>
          </div>
        </div>
        {/* end header top */}

        {/* header bottom */}
        <div className="flex items-center justify-between py-6">
          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Home Page</p>
          </Link>

          <Link to="/products" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Hộp trồng trọt</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 1</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 2</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 3</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 4</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Phân bón</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 1</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 2</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 3</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 4</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Đất và đất nền</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 1</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 2</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 3</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 4</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Chậu và hộp đựng</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 1</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 2</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 3</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 4</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Vòi phun</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 1</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 2</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 3</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 4</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Cây trồng & Dụng cụ</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 1</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 2</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 3</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 4</p>
                </Link>
              </div>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-x-2 relative group">
            <p className="font-semibold text-sm">Thông gió</p>

            <div>
              <i className="fa-solid fa-angle-down"></i>
            </div>

            <div className="absolute top-full hidden group-hover:block z-20">
              <div className="mt-2 bg-white rounded py-3 px-2 min-w-36 shadow">
                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 1</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 2</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 3</p>
                </Link>

                <Link
                  to=""
                  className="flex items-center gap-x-1 [&:not(:last-child)]:mb-3"
                >
                  <span className="size-[3px] bg-[#505F4E] rounded-full block"></span>

                  <p className="text-sm text-[#665345]">Sản phẩm 4</p>
                </Link>
              </div>
            </div>
          </Link>
        </div>
        {/* header bottom */}
      </div>
    </div>
  );
};

export default MainHeader;
