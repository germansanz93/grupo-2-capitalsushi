import "./Sidebar.css"
const Sidebar = () => {
    const SidebarOpen = true
    return(
        <div className={SidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                {/* <div className="sidebar__img">
                    <img src={logo} alt="logo" />
                    <h1>Codersbite</h1>
                </div> */}
            {/* <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}></i> */}
            </div>

            <div className="sidebar__menu">
                <div classname="sidebar__link active_menu_link">
                    <i className="fa fa-home"></i>
                    <a href="#">Dashboard- Capital Sushi</a>
                </div>
                <h2>CS</h2>
                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <a href="#">Pages</a>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <a href="#">Charts</a>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <a href="#">Tables</a>
                </div>
                <div className="sidebar__logout">
                    <i className="fa fa-power-off"></i>
                    <a href="#">Log out</a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar