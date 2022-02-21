import "../../../node_modules/react-vis/dist/style.css"
import React, { Component } from 'react';
import ChartRow from './ChartRow';
import "./Chart.css";


class Chart extends Component {
    constructor(props) {
        super(props); //ejecuta el constructor de component que es una clase de react
        this.state = {
            productList: []
        };
      }
    
      apiCall(url, consecuencia) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => consecuencia(data))
          .catch((e) => console.log(e));
      }
    
      componentDidMount() {
        this.apiCall("http://localhost:3000/api/products", this.products);
      }

      products = (data) => {
          this.setState({
              productList: data.data
          })
      }

      render() {
          return(
              <React.Fragment>
                          {/*<!-- PRODUCTS LIST -->*/}
                          <h1 className="h3 mb-2 text-gray-800">Lista de productos</h1>
                          
                          {/*<!-- DataTales Example -->*/}
                          <div className="container-lista-productos">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Nombre</th>
                                                    <th>Descripción</th>
                                                    <th>Precio</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.productList.map((producto) => {return <ChartRow item= {producto}/>})}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                          </div>            
              </React.Fragment>
          )
      }
}

export default Chart;