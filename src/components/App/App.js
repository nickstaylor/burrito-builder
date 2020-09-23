import React, { Component } from 'react';
import './App.css';
import {getOrders, takeOrder, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount() {
    getOrders()
      // .then(data => console.log(data))
      .then(data => {
        this.setState({
          orders: data.orders
        })
      })
      .catch(err => {
        this.setState({ error: 'Error fetching orders, please try again' })
      });
  }

  takeAnOrder = (order) => {
    takeOrder(order)
      .then(data => {
        this.setState({ orders: [...this.state.orders, data] })
      })
      .catch(err => {
        this.setState({ error: "Error taking order, please try again" });
      })
  }



  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm takeAnOrder={this.takeAnOrder}/>
        </header>
        <h4>{this.state.error}</h4>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
