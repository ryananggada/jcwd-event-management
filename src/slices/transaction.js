import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    buyInstant,
    cart: window.localStorage.getItem('cart') 
        ? JSON.parse(window.localStorage.getItem('cart'))
        : []
}

const transactionSlice = createSlice({
    name: "buy",
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cart.push(action.payload)
            window.localStorage.setItem(
                'cart', 
                JSON.stringify(
                    JSON.parse(window.localStorage.getItem('cart')
                ).push(action.payload))
            )
        },
        removeCart(state){
            state.cart = []
            window.localStorage.setItem(
                'cart', JSON.stringify([])
            )
        },
        removeFromCart(state, action){
            const newCart = state.cart.splice(action.payload, 1)
            window.localStorage.setItem(
                'cart',
                JSON.stringify(newCart)
            )
        },
        instantBuy(state, action){
            state.buyInstant = action.payload
        }
    }
})

export const { addToCart, removeFromCart, instantBuy } = transactionSlice.actions()

export default transactionSlice.reducer