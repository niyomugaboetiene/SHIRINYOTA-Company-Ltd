import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [product, setProduct] = useState(null);
    const [isLogged, setIsLogged] = useState(true);
    const navigate = useNavigate();


    const handleGetProduct = async () => {
        try {
           const res = await axios.get('http://localhost:3000/product/list', { withCredentials: true });
           setProduct(res.data.list);
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message === 'Login first.') {
                setIsLogged(false);
            }
        }
    }

  
    useEffect(() => {
        handleGetProduct();
    }, []);


    const handleDeleteStockOut = async (_id) => {
        try {
            const confrim = window.confirm("Are you sure ?");
            if (confrim ){
                await axios.delete(`http://localhost:3000/product/delete/${_id}`, { withCredentials: true });
               await handleGetProduct();
            }
        } catch (err) {
            console.error(err);
           if (err?.response?.data?.message === 'Login first.') {
                setIsLogged(false);
            }
        }
    }

    if (!isLogged) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-yellow-200 p-3 h-50 px-5 rounded-xl">
                     <h1 className="text-center text-yellow-700 text-xl font-bold">Security Alert</h1>
                     <p className="text-center text-yellow-700 text-md mt-3">Login to access this data. for only authrized users</p>
                     <button className="text-center bg-blue-300 mt-4 ms-33 py-3 px-6 rounded-full text-white font-bold" onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-blue-50 min-h-screen">
            <div className="max-w-7xl mx-auto w-ful">
                <h1 className="text-xl text-center font-bold text-blue-500">Products List</h1>
                <table className="w-full">
                    <thead className="bg-amber-500 text-gray-800">
                        <tr>
                            <th className="py-3 px-2 text-left">Product Id</th>
                            <th className="py-3 px-2 text-left">Product Name</th>
                            <th className="py-3 px-2 text-left" colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {product?.map((product, index) => (
                            <tr key={index} className="bg-blue-100 text-gray-800">
                                <td className="py-3 px-2 text-left">{product.Product_Id}</td>
                                <td className="py-3 px-2 text-left">{product.Product_Name}</td>
                                <td>
                                    <Link to={`/product/update/${product._id}`} className="bg-amber-500 py-2 px-6 rounded-lg text-white hover:bg-amber-400 transition-colors">Update</Link>
                                </td>
                                <td>
                                   <button
                                    className="bg-red-500 py-2 px-6 rounded-lg text-white hover:bg-amber-400 transition-colors"
                                    onClick={() => handleDeleteStockOut(product._id)}
                                  >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList;