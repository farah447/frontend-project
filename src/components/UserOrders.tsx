import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Stack, FormControl, TextField } from "@mui/material";
import { addOrders, deleteOrders, updateOrders } from "../redux/orders/ordersSlice";

import themes from '../Theme/Themes';
import AdminSidebar from './AdminSidebar'
import useOrdersState from "../hooks/useOrdersState";


const UserOrders = () => {
    const { orders, isLoading, error } = useOrdersState()
    const [orderPurchasedAt, setOrderPurchasedAt] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [orderId, setOrderId] = useState(0)
    const dispatch: AppDispatch = useDispatch()


    const handleEdit = (id: number, purchasedAt: string) => {
        setOrderId(id)
        setIsEdit(!isEdit)
        setOrderPurchasedAt(purchasedAt)
    }
    const handleDelete = (id: number) => {
        dispatch(deleteOrders(id))
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOrderPurchasedAt(event.target.value)
    }
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!isEdit) {
            const newOrder = { id: new Date().getTime(), purchasedAt: orderPurchasedAt }
            dispatch(addOrders(newOrder))
        } else {
            const updateOrderData = { id: orderId, purchasedAt: orderPurchasedAt }
            dispatch(updateOrders(updateOrderData))
        }
        setOrderPurchasedAt('')
    }

    return (
        <ThemeProvider theme={themes} >
            <div className='container-order'>
                <AdminSidebar />
                <h2>Create a Category</h2>
                <form onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <Stack direction="row" spacing={2}>
                            <TextField label="add order" type='text' name='order' value={orderPurchasedAt} placeholder='Enter order name' onChange={handleChange} />
                            <Button
                                className="create-button"
                                variant="outlined"
                                color="secondary"
                                size='small'
                                type="submit">
                                {isEdit ? 'Update' : 'Create'} </Button>
                        </Stack>
                    </FormControl>
                </form>
                <br />
                <section className='products'>
                    {orders.length > 0 &&
                        orders.map((order) => {
                            return (
                                <article key={order.id} className='product'>
                                    <h2>Order id: {order.id}</h2>
                                    <p>Order product id: {order.productId}</p>
                                    <p>Order purchased At: {order.purchasedAt}</p>
                                    <p>Order user id: {order.userId}</p>
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            className="Update"
                                            variant="outlined"
                                            color="secondary"
                                            size='small'
                                            onClick={() => { handleEdit(order.id, order.purchasedAt) }}>
                                            Edit </Button>
                                        <Button
                                            className="Delete"
                                            variant="outlined"
                                            color="secondary"
                                            size='small'
                                            onClick={() => {
                                                handleDelete(order.id)
                                            }}>
                                            Delete </Button>
                                    </Stack>
                                </article>
                            )
                        })}
                </section>
            </div>
        </ThemeProvider>
    )
}

export default UserOrders