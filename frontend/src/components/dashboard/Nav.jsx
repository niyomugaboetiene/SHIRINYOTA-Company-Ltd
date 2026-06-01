import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <div>
                <div>
                    <h1>SHIRINYOTA</h1>
                </div>
                <div>
                    <nav>
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