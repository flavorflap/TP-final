import React, { Component } from 'react';
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
                loading: false
            })
        })
    }
    render() { 
        if (this.state.loading){
            return <p>Cargando la información...</p>
        }
        const breadcrumb = this.state.product.categories.map(c => {
            return <li className='detail breadcrum-item'>{c}</li>
        })
    
        return ( 
            <div className='detail-container'>
                <ul className='detail breadcrumb-container'>
                {breadcrumb}
                </ul>
                <div className='detail product-container'>
                    <div className='detail top-container'>
                        <div className='detail product-image-container'>
                            <img src={this.state.product.item.picture} alt={this.state.product.item.title} className='detail product-image'/>
                        </div>
                        <div className='detail info-container'>
                            <span className='detail condition-sold-quantity'>{this.state.product.item.condition} - {this.state.product.item.sold_quantity} vendidos</span>
                            <p className='detail product-title'>{this.state.product.item.title}</p>
                            <div className='detail price-container'>
                                <span className='detail product-price'>$ {this.state.product.item.price.amount}</span>
                                {(this.state.product.item.price.decimals == 0)?<span className='price-decimals'>00</span>:<span className='price-decimals'>{this.state.product.item.price.decimals}</span>}
                            </div>
                            <button className='detail buy-btn'>Comprar</button>
                        </div>
                    </div>
                    <div className='detail description-container'>
                            <p className='detail description-title'>Descripción de Producto</p>
                            <p className='detail description'>{this.state.product.item.description}</p>
                    </div>
                </div> 
            </div>
         );
    }
}
 
export default Detail;