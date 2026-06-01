import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="bg-blue-50">
            <div className="flex justify-between h-25 shadow-2xl">
                <div className="bg-linear-to-bl from-blue-500 to-purple-500 via-green-500 text-transparent bg-clip-text">
                    <h1 className="text-2xl ms-10 mt-8 font-bold">SHIRINYOTA</h1>
                </div>
                <div className="mt-10">
                    <nav className="flex space-x-5 text-blue-500">
                        <Link>Home</Link>
                        <Link>Products</Link>
                        <Link>Stock In</Link>
                        <Link>Stock Out</Link>
                    </nav>
                </div>
                <div>
                    Admin Data
                </div>
            </div>
        </div>
    )
}
export default NavBar;