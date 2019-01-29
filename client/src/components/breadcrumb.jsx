import React, { Component } from 'react';

class Breadcrumb extends Component {
    render() { 
        const breadcrumb = this.props.categories.map(c => {
            return <li key={`category-${c}`} className='detail breadcrumb-item'>{c}</li>
        })
        return ( 
            <ul className='detail breadcrumb-container'>
            {breadcrumb}
            </ul>
         );
    }
}
 
export default Breadcrumb;