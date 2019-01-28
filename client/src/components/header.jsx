import React, { Component } from 'react';
import AdaIsoBlanco from '../assets/Ada_Iso_Blanco.png'
import SearchIcon from '../assets/Icono_Search.png'
import '../stylesheets/header.css'
import {Link} from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSearch:''
          }
        // this.handleOnClickSearch = this.handleOnClickSearch.bind(this)
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
    }
    handleOnChangeInput(e){
        this.setState({
            newSearch: e.target.value 
        })
    }
    handleOnClick(){
        this.setState({
            newSearch: ''
        })
    }
    
    render() { 
        return (
            <div className='search-bar-container'>
                <Link to='/'><img src={AdaIsoBlanco} className='logo-ada' alt='logo ADA'></img></Link>
                <input value={this.state.newSearch} type='text' onChange={this.handleOnChangeInput} placeholder="Nunca dejes de buscar" className='search-input'/>
                <Link to={`/items?search=${this.state.newSearch}`}>
                    <div className='search-icon-container' > 
                    <img src={SearchIcon} onClick={this.handleOnClick} alt='search icon' className='search-icon' />
                    </div>
                </Link>
            </div>
    
         );
        }
    }
export default Header;