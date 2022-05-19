import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const saveCart = createAsyncThunk("cart/saveCart",async (cart,{getState})=>{
    const {cart:{items},auth:{id}} = getState()

    const result = await fetch("/api/cart",{
        method:"POST",
        body:JSON.stringify({idUser:id,data:{items}}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    const data = await result.json()
    console.log(data)

    return data
})


export const getCart = createAsyncThunk("cart/getCart",async (payload,{getState})=>{
    const {auth:{id}} = getState()
    const result = await fetch("/api/cart/get",{
        method:"POST",
        body:JSON.stringify({idUser:id}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    const data = await result.json()
    console.log(data)

    return data
})

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        loading:false,
        error:false,
        items:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            // action.payload es el nuevo producto
            //console.log("Producto",{...action.payload})
            const index = state.items.findIndex(item=>item.id===action.payload.id)
            if(index!==-1){
                state.items[index].cantidad +=1
            }else{
                const newObject = {...action.payload,cantidad:1}
                state.items.push(newObject)
            }
            
            // Redux toolkit hace esto por detrás setState({...state})
        },
        removeFromCart:(state,{payload})=>{
            state.items = state.items.filter(product=>product.id!==payload.id)
            //console.log(state.items)
        },
        reduceFromCart:(state,{payload})=>{
            const index = state.items.findIndex(item=>item.id===payload.id)
            if(index!==-1){
                const item = state.items[index]
                item.cantidad -= 1
                if(item.cantidad===0){
                    state.items.splice(index,1)
                }
            }
        },
        emptyCart:(state,action)=>{
            state.items = []
        }
    },
    extraReducers(builder){
        builder.addCase(saveCart.pending,(state,action)=>{
            state.loading = true
        }).addCase(saveCart.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
        }).addCase(saveCart.rejected,(state,action)=>{
            state.loading = false
            state.error = true
        }).addCase(getCart.pending,(state,action)=>{
            state.loading = true
        }).addCase(getCart.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
            state.items = action.payload.items
        }).addCase(getCart.rejected,(state,action)=>{
            state.loading = false
            state.error = true
        })
    }
})

const cartReducer = cartSlice.reducer
export default cartReducer

export const {addToCart,removeFromCart,reduceFromCart,emptyCart} = cartSlice.actions