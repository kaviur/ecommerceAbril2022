import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//agregar la última factura a la lista de facturas en la base de datos
export const saveInvoices = createAsyncThunk("invoice/saveInvoice",async (payment,{getState})=>{

    const {payment:{payment_capture},auth:{id}} = getState()

    const result = await fetch("/api/invoices",{
        method:"POST",
        body:JSON.stringify({idUser:id,data:{payment_capture}}),
        headers:{
            "Content-Type":"application/json"
        }
    })

    const data = await result.json()
    console.log(data)

    return data
})

//obtener todas las facturas de un usuario comprador
export const getUserInvoices = createAsyncThunk("invoices/userInvoices",async (payload,{getState})=>{
    const {auth:{id}} = getState()
    const result = await fetch("/api/invoices/get_user_invoices",{
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


const paymentSlice = createSlice({
    name:"payment",
    initialState:{
        loading:false,
        error:false,
        payment_capture:{},
        invoices:[],
    },
    reducers:{
        addToInvoices:(state,action)=>{
            state.invoices.push(action.payload) //agrego una nueva factura a las facturas extraídas de la db            
        },
        addToCapture:(state,action)=>{
            state.payment_capture = action.payload
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
        }).addCase(getUserInvoices.pending,(state,action)=>{
            state.loading = true
        }).addCase(getUserInvoices.fulfilled,(state,action)=>{
            state.loading = false
            state.error = false
            state.invoices = action.payload.invoices
        }).addCase(getUserInvoices.rejected,(state,action)=>{
            state.loading = false
            state.error = true
        })
    }
})

const paymentReducer = paymentSlice.reducer
export default paymentReducer

export const {addToInvoices, addToCapture} = paymentSlice.actions