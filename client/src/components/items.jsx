import React, { Component } from 'react';
import '../stylesheets/items.css'
import IconoEnvio  from '../assets/Icono_Envio.png'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            category:'',
            results: [],
            loading:true
        }
    }
    componentDidMount(){
        const search = queryString.parse(this.props.location.search)
        fetch(`http://localhost:8080/api/items?q=${search.search}`)
        //?search=' + this.props.match.query.search
        .then(res => res.json())
        .then(data =>
            this.setState({
                category: data.category.name,
                results: data.items,
                loading: false
            }))
    }
    render() { 
        if (this.state.loading){
            return <p>Cargando la información...</p>
        }

        const items = this.state.results.map(r => 
            <li className='items' key={r.id}>
                <div className='item-container'>

                <Link to={`/items/${r.id}`}> <img src={r.picture} alt={r.title} className='product-image'/> </Link>
            
                <div className='info-container'>
                    <div className='price-container'>
                        <span>$ {r.price.amount}</span>
                        {(r.price.decimals == 0)?<span className='price-decimals'>00</span>:<span className='price-decimals'>{r.price.decimals}</span>}  
                        <span className='free-shipping'>{(r.free_shipping) ? <img src={IconoEnvio} alt='envio gratis'/> : ''}</span>
                    </div>
                    <div className='location-container'>
                        <span>{r.location}</span>
                    </div>
                    <Link to={`/items/${r.id}`}> 
                    <div className='title-container'>
                        <span>{r.title}</span>
                    </div>
                    </Link>
                 
                    <div></div>
                </div>
            </div>
            </li>)
        return ( 
                <div>
                    <p className='main-category'>{this.state.category}</p>
                    <ul id='items'>
                        {items}
                    </ul>
                </div>
         );
    }
}
 
export default Items;