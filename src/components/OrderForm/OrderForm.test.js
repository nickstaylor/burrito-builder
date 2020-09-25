import React from "react";
import OrderForm from "./OrderForm";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe("OrderForm",() => {
    
    it('should render the OrderForm and name input at the top of the page', () => {
        const { getByPlaceholderText, getByText } = render(<OrderForm />)
        
        expect(getByPlaceholderText('Name')).toBeInTheDocument()
        expect(getByText("Order: Nothing selected")).toBeInTheDocument()
        expect(getByText("lettuce $ 0.40")).toBeInTheDocument()
    })

    it('should updated the Order as name and ingredients are added', () => {
        const { getByText, getByPlaceholderText, toHaveProperty } = render(<OrderForm />)
        
        const nameInput = getByPlaceholderText("Name")
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Nick' } })
        fireEvent.click(getByText('beans $ 0.65'))
        fireEvent.click(getByText('lettuce $ 0.40'))
        
        expect(getByText('Order: beans, lettuce')).toBeInTheDocument()
        expect(nameInput).toHaveProperty('value', 'Nick')
    })
    
    it('should show an error message if a name or ingredient is not entered', () => {
        const { getByText, getByPlaceholderText, queryByText } = render(<OrderForm />)
        
        fireEvent.click(getByText('Submit Order'))
        expect(getByText("Please add name or ingredient")).toBeInTheDocument();
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Nick' } })
        expect(getByText("Please add name or ingredient")).toBeInTheDocument();
        fireEvent.click(getByText('lettuce $ 0.40'))
        expect(queryByText('Please add name or ingedient')).not.toBeInTheDocument()
        
    })

    it('should submit an order if there are no errors', () => {
        const mockSubmitOrder = jest.fn()
        const { getByText, getByPlaceholderText } = render(
            <OrderForm takeAnOrder={mockSubmitOrder} />)
             
        fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Nick' } })
        fireEvent.click(getByText('lettuce $ 0.40'))
        fireEvent.click(getByText('Submit Order'))
        expect(mockSubmitOrder).toHaveBeenCalled()
    })

    it('should only allow for a maximum of 2 specific ingredidents to be added', () => {
        const { getByText, queryByText } = render(<OrderForm />);
        fireEvent.click(getByText("beans $ 0.65"));
        fireEvent.click(getByText("beans $ 0.65"));
        expect(queryByText('So sorry, you can only have two of a specific ingredient.')).not.toBeInTheDocument()
        fireEvent.click(getByText("beans $ 0.65"));
        expect(getByText('So sorry, you can only have two of a specific ingredient.')).toBeInTheDocument()

    })
        

})
