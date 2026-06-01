import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-black text-white fixed bottom-0 left-0 right-0">
            <div className="flex justify-between h-70">
                <div className="bg-linear-to-bl from-blue-500 to-purple-500 via-green-500 text-transparent bg-clip-text">
                    <h1 className="text-2xl ms-10 mt-8 font-bold">SHIRINYOTA</h1>
                    <p className="text-white ms-10">SHIRINYOTA Company Ltd, located in Rwanda.</p>
                </div>
                <div>
                    <h1>Quick Links</h1>
                    <div>
                    <Link>Home</Link>
                    <Link>Products</Link>
                    <Link>Stock In</Link>
                    <Link>Stock Out</Link>
                    </div>
                </div>
                <div>
                    <h1>Contacts</h1>
                    <p>niyomugaboetiene53@gmail.com</p>
                    <p>072818429</p>
                </div>
                <div>
                    <h1>Lets Go Social</h1>
                     <div>
                        <p><FaFacebook /></p>
                        <p><FaInstagram /></p>
                        <p><FaYoutube /></p>
                        <p><FaTwitter /></p>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;