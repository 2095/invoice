import React from 'react';
import './buyers-page.css';
import {connect} from 'react-redux';
import {setTerm, changeVisibleBuyers, setVisibleBuyersToNull, changeDirection} from '../../redux/actions';

const mapStateToProps = (state) => {
    return {
      buyersList: state.buyersList,
      term: state.term,
      visibleBuyers: state.visibleBuyers,
      ascendingDirection: state.ascendingDirection
    }};

const mapDispatchToProps = (dispatch) => {
    return {
      setTerm: (payload) => dispatch(setTerm(payload)),
      changeVisibleBuyers: (payload) => dispatch(changeVisibleBuyers(payload)),
      setVisibleBuyersToNull: () => dispatch(setVisibleBuyersToNull()),
      changeDirection: () => dispatch(changeDirection())
    }};

class BuyersPage extends React.Component {

    onSearchChange(e){
      this.props.setTerm(e.target.value);
      let visibleBuyers = this.searchFilter(this.props.buyersList, e.target.value);
      this.props.setVisibleBuyersToNull();
      for (let obj in visibleBuyers){
        this.props.changeVisibleBuyers(visibleBuyers[obj]);
      }
    }

    searchFilter(buyers, term){
      if(term.length === 0){
        return buyers;
      }

      return buyers.filter((obj) => {
        return obj.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
    }

    requestSort = (key) => {
      let sortedProducts = [...this.props.visibleBuyers];

      sortedProducts.sort((a, b) => {
        if (a[key] < b[key]) {
          return this.props.ascendingDirection ? -1: 1;
        }
        if (a[key] > b[key]) {
          return this.props.ascendingDirection ? 1: -1;
        }
        return 0;
      });

      this.props.setVisibleBuyersToNull();
      for (let obj in sortedProducts){
        this.props.changeVisibleBuyers(sortedProducts[obj]);
      }

      this.props.changeDirection();
    }

    render() {
      return(
      <div className="d-flex">
        <table className="table buyers">
            <thead>
                <tr>
                    <th scope="col">ID покупателя</th>
                    <th scope="col">Имя покупателя</th>
                    <th scope="col"><button type="button" className="btn btn-outline-primary sortButton" 
                    onClick={() => this.requestSort('averageCheck')}>Средний чек</button></th>
                    <th scope="col"><button type="button" className="btn btn-outline-primary sortButton" 
                    onClick={() => this.requestSort('purchaseNumber')}>Количество покупок</button></th>
                    <th scope="col"><button type="button" className="btn btn-outline-primary sortButton" 
                    onClick={() => this.requestSort('totalRevenues')}>Общая выручка</button></th>
                </tr>
            </thead>
            <tbody>
                {this.props.visibleBuyers.map(item => {
                 return(
                    <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.averageCheck}</td>
                        <td>{item.purchaseNumber}</td>
                        <td>{item.totalRevenues}</td>
                    </tr>
                    )})}
            </tbody>          
        </table>
        <input type='text' className='form-control add searchName' placeholder="Поиск по имени" value={this.props.term}
          onChange={(e)=>this.onSearchChange(e)}/>
        </div>
      )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BuyersPage);