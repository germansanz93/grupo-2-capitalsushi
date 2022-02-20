import "./Navbar.css";
/*import avatar from "todavia no tengo" */

const Navbar = ({ sidebarOpen, openSidebar}) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
                <a href="#">Ult Prod</a>
                <a href="#">Ult Usuario</a>
                <a href="#">Categorías</a>
                <a href="#">Listado Prod</a>
                <a className="active_link" href="#">Admin</a>
            </div>
            <div className="navbar__right">
                <a href="#">
                    <i className="fa fa-search"></i>
                </a>
                <a href="#">
                    <i className="fa fa-clock-o"></i>
                </a>
                {/* <a href="#">
                    <img width="30" src={avatar} alt="avatar" />
                </a> */}
            </div>
        </nav>
    );
};

export default Navbar