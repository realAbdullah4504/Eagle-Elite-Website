import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false,
    cart: [],
    orders:[],
    users:[],
    items: [],
    categories:[],
    notify:0
}

export const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(c => c._id !== action.payload.id)
            //console.log(state.cart);
        },
        increaseCount: (state, action) => {
            //console.log(state.items);
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload.id) {
                    item.attributes.count++;
                }

                return item;
            })
            //console.log(state.cart);

        },
        
        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload.id && item.attributes.count > 1)
                    item.attributes.count--
                return item;
            })
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
            //console.log(state.cart);
        },
        resetCart: (state) => {
            state.cart = [];
            //Sconsole.log(state.cart);
        },
        setItems: (state, action) => {
            state.items = action.payload.items;
        },
        setEditedItem: (state, action) => {
            state.items=state.items.map((item) => {
                if (item._id === action.payload.item._id) 
                    item = action.payload.item;
                    //console.log(item);
                    return item;
            })
        },
        addToItems: (state, action) => {
            state.items=[...state.items, action.payload.item];
        },
        setCategories: (state, action) => {
            state.categories = action.payload.categories;
        },
        addToCategory: (state, action) => {
            state.categories=[...state.categories, action.payload.category];
        },
        setOrders: (state, action) => {
            state.orders = action.payload.orders;
        },
        setEditedOrder: (state, action) => {
            state.orders=state.orders.map((order) => {
                if (order._id === action.payload.order._id) 
                    order.orderStatus = action.payload.order.orderStatus;
                    //console.log(item);
                    return order;
            })
        },

        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        setNotify: (state, action)=>{
            state.notify = state.notify+1;

            console.log(state.notify);
        }
        
    }
})

export const {
    setIsCartOpen,

    removeFromCart,

    increaseCount,
    decreaseCount,

    addToCart,
    resetCart,

    setItems,
    addToItems,
    setEditedItem,

    
    setCategories,
    addToCategory,
    
    setOrders,
    setEditedOrder,

    setUsers,

    setNotify
} = cartSlice.actions

export default cartSlice.reducer;
