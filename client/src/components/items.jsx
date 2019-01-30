import React, { Component } from "react";
import "../stylesheets/items.css";
import IconoEnvio from "../assets/Icono_Envio.png";
import { Link } from "react-router-dom";
import queryString from "query-string";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      results: [],
      q: queryString.parse(this.props.location.search),
      loading: true,
      hasError: false
    };
  }


retrieveItem (search) {
    fetch('http://localhost:8080/api/items?q=' + search)
    .then(res => res.json())
    .then(data =>
      this.setState({
        category: data.category.name,
        results: data.items,
        loading: false
      })
    )
    .catch(() => {
     this.setState({
         hasError: true
     })
    })
  }


  // TODO: Encapsular el fetch en una funcion y llamarla desde componentDidMount y componentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    const q = queryString.parse(nextProps.location.search);
    const { search } = q;
    if (search !== this.state.q) {
      this.setState({ loading: true },
        this.retrieveItem(search)
      )
    }
  }
  componentDidMount() {
    this.retrieveItem(this.state.q.search)
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
    if (this.state.loading) {
      return <p>Cargando los productos...</p>;
    }

    const items = this.state.results.map(product => (
      <li className="items" key={product.id}>
        <div className="item-container">
          <Link to={`/items/${product.id}`}>
            <img src={product.picture} alt={product.title} className="product-image" />{" "}
          </Link>
          <div className="info-container">
            <div className="price-container">
              <span>$ {product.price.amount}</span>
              {parseInt(product.price.decimals) === 0 ? (
                <sup className="price-decimals">00</sup>
              ) : (
                <sup className="price-decimals">{product.price.decimals}</sup>
              )}
                {product.free_shipping  && (
                <span className="free-shipping">
                  <img src={IconoEnvio} alt="envio gratis" />
                </span>)}
              
            </div>
            <div className="location-container">
              <span>{product.location}</span>
            </div>
            <Link to={`/items/${product.id}`}>
              <div className="title-container">
                <span>{product.title}</span>
              </div>
            </Link>

            <div />
          </div>
        </div>
      </li>
    ));
    return (
      <div>
        <p className="main-category">{this.state.category}</p>
        <ul id="items">{items}</ul>
      </div>
    );
  }
}

export default Items;