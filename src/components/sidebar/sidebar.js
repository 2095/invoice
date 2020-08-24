import React from 'react';
import './sidebar.css';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'

const mapStateToProps = (state) => {
    return {
        avatarUrl: state.avatarUrl,
        userIsAuthorized: state.userIsAuthorized
      }};

class Sidebar extends React.Component {
    render() {
      
    if(!this.props.userIsAuthorized){
        return <Redirect to="/login"/>          
    }  

      return (
        <div className="wrapper"> 
            <nav className="sidebar">
                <div >
                    <img className="avatar" src={this.props.avatarUrl}></img>
                </div>

                <ul className="list-unstyled components">
                    <li>
                        <Link to='/terminals'>Терминалы</Link>
                    </li>
                    <li>
                        <Link to='/buyers'>Покупатели</Link>
                    </li>
                </ul>

                <p className='footer'>Copyright © 2020</p>
            </nav>
        </div> 
      )
    }
  }

export default connect(mapStateToProps)(Sidebar);