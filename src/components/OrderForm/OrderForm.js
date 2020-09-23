import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length) {
      let order = {
        name: this.state.name,
        ingredients: this.state.ingredients
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

  handleIngredientChange = (e) => {
    e.preventDefault()
    let newIngredients = [...this.state.ingredients, e.target.name]
    this.setState({ingredients: newIngredients})
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], error: ''});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });
    // console.log('ingredients', this.state.ingredients);a
    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    )
  }
}

export default OrderForm;
