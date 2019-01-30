import React, { Component } from 'react';
import Breadcrumb from './breadcrumb'
import '../stylesheets/detail.css'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            product:'',
            loading: true
         }
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/items/'+ this.props.match.params.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                product: data,
                loading: false,
                hasError: false
            })
        })
        .catch(err => {
            console.log(err + 'Algo no anda bien')
        })
    }
    render() { 

        if (this.state.hasError){
            return (
                <div>
                    <p className='error-message'>OOPS! ALGO ANDA MAL! :S <br></br>
                    (yo no fui => 🐀)</p>
                </div>
                )
        }
        if (this.state.loading){
            return <p>Cargando la información del producto...</p>
        }
        const product= this.state.product.item
        return ( 
            <div className='detail-container'>
              <Breadcrumb categories={this.state.product.categories}/>
                <div className='detail product-container'>
                    <div className='detail top-container'>
                        <div className='detail product-image-container'>
                            <img src={product.picture} alt={product.title} className='detail product-image'/>
                        </div>
                        <div className='detail info-container'>
                            <span className='detail condition-sold-quantity'>{product.condition} - {product.sold_quantity} vendidos</span>
                            <p className='detail product-title'>{product.title}</p>
                            <div className='detail price-container'>
                                <span className='detail product-price'>$ {product.price.amount}</span>
                                {(parseInt(product.price.decimals) === 0)?<sup className='detail price-decimals'>00</sup>:<sup className='price-decimals'>{product.price.decimals}</sup>}
                            </div>
                            <button className='detail buy-btn'>Comprar</button>
                        </div>
                    </div>
                    <div className='detail description-container'>
                            <p className='detail description-title'>Descripción de Producto</p>
                            <p className='detail description'>{product.description}</p>
                    </div>
                </div> 
            </div>
         );
    }
}
 
export default Detail;