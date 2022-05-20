import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const saveInvoices = createAsyncThunk("invoice/saveInvoice",async (payment,{getState})=>{

    const result = await fetch("/api/invoices",{
        method:"POST",
        body:JSON.stringify({data:{invoice}}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    const data = await result.json()
    console.log(data)

    return data
})


// export const getCart = createAsyncThunk("cart/getCart",async (payload,{getState})=>{
//     const {auth:{id}} = getState()
//     const result = await fetch("/api/cart/get",{
//         method:"POST",
//         body:JSON.stringify({idUser:id}),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     })

//     const data = await result.json()
//     console.log(data)

//     return data
// })


const paymentSlice = createSlice({
    name:"payment",
    initialState:{
        loading:false,
        error:false,
        invoices:[],
        numOfInvoices:0
    },
    reducers:{
        addToInvoices:(state,action)=>{
            state.invoices.push(action.payload) //agrego una nueva factura
            state.numOfInvoices +=1
            
        }
    },
    extraReducers(builder){
        builder.addCase(saveInvoices.pending,(state,action)=>{
            state.loading = true
        }).addCase(saveInvoices.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
        }).addCase(saveInvoices.rejected,(state,action)=>{
            state.loading = false
            state.error = true
        })
    }
})

const paymentReducer = paymentSlice.reducer
export default paymentReducer

export const {addToInvoices} = paymentSlice.actions