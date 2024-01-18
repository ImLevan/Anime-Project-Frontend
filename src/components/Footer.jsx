import { Link } from 'react-router-dom';
import "./Footer.css"


const Footer = () => {
    // const categoryItems = [
    //     { name: 'Explorar', path: `/explore` },
    //     { name: 'Noticias', path: `/news` },
    //     { name: 'Precios', path: `/pricing` },
    // ];


    return (
        <footer className="section-p1">

            {/* <div className="col">
                <ul id="footer-navbar">
                    <h4>Categorías</h4>
                    {categoryItems.map((item) => (
                        <li key={item.path}>
                        <Link to={item.path}>
                            {item.name}
                        </Link>
                        </li>
                    ))}
                </ul>
            </div> */}

            <div className="copyright">
                <p>Creado por <Link to="https://imlevan.github.io/" target="_blank" rel="noopener noreferrer">VC</Link></p>
            </div>
        </footer>
    );
};

export default Footer;