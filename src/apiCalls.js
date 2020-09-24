export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const takeOrder = (order) => {
    return fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: order.name,
        ingredients: order.ingredients
      })
    })
      .then((response => response.json()));
}

export const deleteOrder = (id) => {
  try {
    return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.log(err)
    return {ok: false}
  }
}
