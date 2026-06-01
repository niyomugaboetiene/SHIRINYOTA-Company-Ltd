import { Link } from "react-router-dom";
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter} from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <div>
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