// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import api from '../../config/axios';
// import { IProduct } from '../../interfaces/product';
// import ProductItem1 from '../../components/ProductItem1';

// const Search = () => {
//     const [products, setProduct] = useState<IProduct[]>([])
//     let [search] = useSearchParams();
//     const [keyword, setKeywords] = useState<string>('');
//     useEffect(() => {
//         console.log(search.get('keyword'));
//         (async () => {
//             const { data } = await api.get('products?name_like=' + search.get('keyword'));
//             setProduct(data)
//             console.log("data", data);
//             setKeywords(search.get('keyword') as string)
//         })()
//         console.log(products);

//     }, [search])
//     return (
//         <div>
//             <h1>Kết quả tìm kiếm {keyword}</h1>
//             <div>
//                 {products.map((product) => (
//                     <ProductItem1 product={product} />
//                 ))}
//             </div>
//         </div >
//     )
// }


// export default Search