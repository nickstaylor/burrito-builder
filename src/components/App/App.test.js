import React from 'react';
import App from './App'
import { fireEvent, render, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { takeOrder, getOrders } from '../../apiCalls'
jest.mock("../../apiCalls");

describe("App", () => {

    let sampleOrders

    beforeEach(async () => {
        sampleOrders = {
            orders: [
                {
                    id: 1,
                    name: "Pat",
                    ingredients: [
                        "beans",
                        "lettuce",
                        "carnitas",
                        "queso fresco",
                        "jalapenos",
                    ],
                },
                {
                    id: 2,
                    name: "Sam",
                    ingredients: [
                        "steak",
                        "pico de gallo",
                        "lettuce",
                        "carnitas",
                        "queso fresco",
                        "jalapenos",
                    ],
                },
            ]
        };

        
    })
    
    it('should be able to retrieve and display orders on page load', async () => {
        await getOrders.mockResolvedValueOnce(sampleOrders)
        const { getByText } = render(<App />)
        
        const samName = await waitFor(() => getByText('Sam'))
        expect(samName).toBeInTheDocument();
        expect(getByText('Pat')).toBeInTheDocument()
        
    })
    
    it('should be able to add a burrito order and display the new order', async () => {
        await getOrders.mockResolvedValueOnce(sampleOrders)
        await takeOrder.mockResolvedValueOnce({
                        id: 2,
                        name: "Ted",
                        ingredients: ["beans", "steak"]
   
            });
        const { getByText, getByPlaceholderText, getByRole } = render(<App />);

    
        fireEvent.change(getByPlaceholderText("Name"), { target: { value: "Ted" },});
        const beans = getByRole("button", { name: "beans" });
        fireEvent.click(beans);
        const steak = getByRole("button", { name: "steak" });
        fireEvent.click(steak);
        fireEvent.click(getByText('Submit Order'))
        await waitFor(() => expect(takeOrder).toHaveBeenCalled())
        expect(takeOrder).toHaveBeenCalledWith({ name: 'Ted', ingredients: ['beans', 'steak'] })
        expect(getByText('Ted')).toBeInTheDocument()


    })

    it("Should display error if get request fails", async () => {
      getOrders.mockRejectedValueOnce([404]);
      const { findByRole } = render(<App />);
        const errorMessage = await findByRole("heading", {
          name: 'Error fetching orders, please try again'
      });
      expect(errorMessage).toBeInTheDocument();
    });





})
