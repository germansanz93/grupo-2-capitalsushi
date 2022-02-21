import "./Main.css";
// import hello from "../../assets/hello.svg"
import Chart from "../charts/Chart";

const Main = () => {
    return(
        <main>
            <div className="main__container">
                <div className="main__title">
                    { <img src= "/imagesindex.jpeg" alt=""/> }
                    <div className="main__greeting">
                        <h1>Dashboard Capital Sushi</h1>
                        <p>Welcome to your admin dashboard</p>
                    </div>
                </div>

                <div className="main__cards">

                    <div className="card">
                        <i className="fa fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">PRODUCTOS</p>
                            <span className="font-bold text-title">0</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-calendar fa-2x text-red"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">USUARIOS</p>
                            <span className="font-bold text-title"> 0</span>
                        </div>
                    </div>

                    <div className="card">
                        <i className="fa fa-video-camera fa-2x text-yellow"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">CATEGORÍAS</p>
                            <span className="font-bold text-title">0</span>
                        </div>
                    </div>

                </div>

                <div className="charts">
                    <div className="charts__left">
                        <div className="charts__left__title">
                            <div>
                                <h1>Ultimo Producto Listado</h1>
                                <p>Capital Federal, Argentina</p>
                            </div>
                            <div className="imagen-product">
                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30 +'rem'}} src="" alt=" Ultimo producto "/>
                            </div>                       
                        </div>
                    </div>
                    
                    <div className="charts__right">
                    
                        <div className="charts__right__title">
                            <div>
                                <h1>Stats Reports</h1>
                                <p>Capital Federal, Argentina</p>
                            </div>
                            <i className="fa fa-usd"></i>
                        </div>

                        <div className="charts__right__cards">
                            <div className="card1">
                                <h1>Income</h1>
                                <p>$0</p>
                            </div>

                            <div className="card2">
                                <h1>Sales</h1>
                                <p>0</p>
                            </div>

                            <div className="card3">
                                <h1>Users</h1>
                                <p>0</p>
                            </div>

                            <div className="card4">
                                <h1>Orders</h1>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Chart />
                    </div>
                </div>
            </div>
        </main>

    )
}

export default Main;