import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: '',
      totalOrderCost: 0
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length) {
      let order = {
        name: this.state.name,
        ingredients: this.state.ingredients,
        cost: this.state.totalOrderCost
      }
      this.props.takeAnOrder(order)
      this.clearInputs();
    } else {
      this.setState({error: "Please add name or ingredient"})
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleIngredientandCostChange = (e) => {
    e.preventDefault()
    const { name, id } = e.target
    let count = 0
    this.state.ingredients.forEach(ingredient => {
      if (name === ingredient) {
        count++
      }
    })
    if (count > 1) {
      this.setState({ error: 'So sorry, you can only have two of a specific ingredient.' })
      return
    }
    let newIngredients = [...this.state.ingredients, name]
    let orderCost = this.state.totalOrderCost
    let total = orderCost + (+id)
    this.setState({ingredients: newIngredients, totalOrderCost: total})
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], error: ''});
  }

  render() {
    const possibleIngredients = [{ ing: 'beans', cost: 0.65 }, { ing: 'steak', cost: 1.50 }, { ing: 'carnitas', cost: 1.25 },
      { ing: 'sofritas', cost: 0.80 }, { ing: 'lettuce', cost: 0.40 }, { ing: 'queso fresco', cost: 0.85 },
      { ing: 'pico de gallo', cost: .75 }, { ing: 'hot sauce', cost: 0.40 }, { ing: 'guacamole', cost: 1.00 },
      { ing: 'jalapenos', cost: 0.40 }, { ing: 'cilantro', cost: 0.00 }, { ing: 'sour cream', cost: 0.50 }];
    const ingredientButtons = possibleIngredients.map((ingredient, i) => {
      return (
        <button key={i} name={ingredient.ing} id={ingredient.cost} style={{'margin': '.3em'}}
         onClick={e => this.handleIngredientandCostChange(e)}>
          {ingredient.ing} $ {Number(ingredient.cost).toFixed(2)}
        </button>
      )
    });
  
    return (
      <form
        style={{
          'display': "flex",
          "flexDirection": "column",
          "alignItems": "center",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
          style={{'marginBottom': '2em'}}
        />
        <div>
          {ingredientButtons}
        </div>
        <p>Order: {this.state.ingredients.join(", ") || "Nothing selected"}</p>
        <p>Order Cost: ${Number(this.state.totalOrderCost).toFixed(2)}</p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    );
  }
}

export default OrderForm;
