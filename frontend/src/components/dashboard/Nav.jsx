import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div className="fixed top-0 left-0 right-0">
        <div className="bg-blue-200">
             <div className="flex justify-end space-x-4 me-5 text-blue-500 font-bold py-2">
                <Link>Login</Link>
                <Link>Register</Link>
             </div>
        </div>
          <div className="bg-blue-50">
            <div className="flex justify-between h-25 shadow-2xl">
                <div className="bg-linear-to-bl from-blue-500 to-purple-500 via-green-500 text-transparent bg-clip-text">
                    <h1 className="text-2xl ms-10 mt-8 font-bold">SHIRINYOTA</h1>
                </div>
                <div className="mt-10">
                    <nav className="flex space-x-5 text-blue-500">
                        <Link to={'/report/daily'}>Home</Link>
                        <Link to={'/product/list'}>Products</Link>
                        <Link to={'/stockIn/list'}>Stock In</Link>
                        <Link to={'/stockOut/list'}>Stock Out</Link>
                    </nav>
                </div>
                <div>
                    Admin Data
                </div>
            </div>
        </div>
      </div>
    )
}
export default NavBar;