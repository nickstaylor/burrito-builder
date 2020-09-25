import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map((order, i) => {
    return (
      <div className="order" key={i}>
        <h3>{order.name}</h3>
        {order.cost && <h4>Cost: ${Number(order.cost).toFixed(2)}</h4>}
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>
          })}
        </ul>
        <button className="delete-btn" role={order.id} onClick={()=> props.deleteAnOrder(order.id)}>
          Order Done
        </button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;