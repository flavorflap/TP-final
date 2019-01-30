import React, { Component } from 'react';
import AdaIsoBlanco from '../assets/Ada_Iso_Blanco.png'
import SearchIcon from '../assets/Icono_Search.png'
import '../stylesheets/searchbar.css'
import { Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSearch:''
          }
    
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }
    handleOnChangeInput(e){
        this.setState({
            newSearch: e.target.value 
        })
    }
    handleOnClick(){
        const {newSearch} = this.state
        if(newSearch.trim() !== ''){
            this.props.history.push(`/items?search=${this.state.newSearch}`)
            this.setState({
                newSearch: ''
            })
        }
    }

    handleKeyPress(e){
        const {newSearch} = this.state
        if(newSearch.trim() !== ''){
            if (e.which === 13){
                this.props.history.push(`/items?search=${this.state.newSearch}`)
                this.setState({
                    newSearch: ''
                })
            }
        }
    }
    
    render() { 
        return (
            <div className='search-bar-container'>
                <Link to='/'><img src={AdaIsoBlanco} className='logo-ada' alt='logo ADA'></img></Link>
                <input value={this.state.newSearch} type='text' onChange={this.handleOnChangeInput} onKeyPress={this.handleKeyPress} placeholder="Nunca dejes de buscar" className='search-input'/>
                <div className='search-icon-container' onClick={this.handleOnClick} > 
                    <img src={SearchIcon} onClick={this.handleOnClick} alt='search icon' className='search-icon' />
                </div>
            </div>
    
         );
        }
    }
export default withRouter (SearchBar);