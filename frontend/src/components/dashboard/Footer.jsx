import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-black text-white fixed bottom-0 left-0 right-0">
            <div className="flex justify-between h-70">
                <div className="bg-linear-to-bl from-green-500 to-purple-500 via-blue-500 text-transparent bg-clip-text">
                    <h1 className="text-2xl ms-10 mt-8 font-bold">SHIRINYOTA</h1>
                    <p className="text-white ms-10">SHIRINYOTA Company Ltd, located in Rwanda.</p>
                </div>
                <div className="mt-5">
                    <h1 className="text-xl font-bold text-blue-500 border-s-3 border-green-500">Quick Links</h1>
                    <div className="space-y-5 grid mt-4">
                    <Link to={'/report/daily'}>Home</Link>
                    <Link to={'/product/list'}>Products</Link>
                    <Link to={'/stockIn/list'}>Stock In</Link>
                    <Link to={'/stockOut/list'}>Stock Out</Link>
                    </div>
                </div>
                <div className="mt-5">
                    <h1 className="text-xl font-bold text-blue-500 border-s-3 border-purple-500">Contacts</h1>
                    <p className="mt-3 text-lg hover:underline">niyomugaboetiene53@gmail.com</p>
                    <p className="mt-3 text-lg hover:underline">Tel: 072818429</p>
                </div>
                <div className="mt-5 me-5">
                    <h1 className="text-xl font-bold text-blue-500 border-s-3 border-purple-500">Lets Go Social</h1>
                     <div className="grid grid-cols-2 mt-2">
                        <p className="bg-blue-500 p-3 flex justify-center items-center rounded-lg me-2"><FaFacebook /></p>
                        <p className="bg-purple-500 p-3 flex justify-center items-center rounded-lg me-2"><FaInstagram /></p>
                        <p className="bg-red-500 p-3 flex justify-center items-center rounded-lg mt-2 me-2"><FaYoutube /></p>
                        <p className="bg-sky-500 p-3 flex justify-center items-center rounded-lg mt-2 me-2"><FaTwitter /></p>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;