import { ChangeCircle, Clear, ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import { useState } from 'react';
import ApproveCancel from './approveCancel/ApproveCancel';
import { orderProps } from '../../../interfaces/propsInterfaces';



function Order({ order, handleChangeStatus }: orderProps) {

    const [open, setOpen] = useState(false);
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setOpen(true)
    };
    const handleClose = () => {setOpen(false)};

    return (
                <Box key={order._id} sx={{ display: 'flex', width: '80vw', justifyItems: 'center', alignItems: 'center', marginLeft: '2em' }}>
                    <Accordion sx={{ minHeight: '5em', border: '0.1em #004d40 solid', backgroundColor: '#b2dfdb' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                        >
                            <Box sx={{ display: 'flex', width: '71vw', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Typography sx={{ width: '20%', flexShrink: 0, textAlign: 'center', fontSize: '1.2rem' }}>{order._id}</Typography>
                                <Typography sx={{ width: '12%', flexShrink: 0, textAlign: 'center', fontSize: '1.2rem' }}>{order.price} $</Typography>
                                <Typography sx={{ width: '12%', flexShrink: 0, textAlign: 'center', fontSize: '1.2rem' }}>{new Date(order.orderTime).toLocaleDateString('en-GB')}</Typography>
                                <Typography sx={{ width: '12%', flexShrink: 0, textAlign: 'center', fontSize: '1.2rem' }}>{order.shippingDetails.orderType}</Typography>
                                <Typography sx={{ width: '12%', flexShrink: 0, textAlign: 'center', fontSize: '1.2rem', padding: "0.1rem", background: `${order.status === 'accepted' ? '#46f31a' : order.status === 'processing' ? '#fcb45c' : order.status === 'sent' ? '#e1f132' : '#ff4639'}`, borderRadius: '1rem' }}>{order.status}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', width: '20vw', justifyContent: 'center', alignItems: 'center' }}>
                                <ApproveCancel open={open} handleClose={handleClose} handleChangeStatus={handleChangeStatus} _order={order}></ApproveCancel>
                                <Box>
                                    <Button onClick={handleOpen} disabled={order.status !== 'processing'} sx={{ color: 'black', border: 'none', marginLeft: '-0.5em', backgroundColor: '#26a69a', '&:hover': { border: 'none', backgroundColor: '#4db6ac' } }} startIcon={<Clear sx={{ color: '#004d40' }} />}>cancel</Button>
                                    <Button variant="contained" disabled={order.shippingDetails.orderType !== 'pickup' || order.status !== 'processing'} onClick={handleChangeStatus(order, 'accepted')} sx={{ color: 'black', border: 'none', marginLeft: '0.5em', backgroundColor: '#26a69a', '&:hover': { border: 'none', backgroundColor: '#4db6ac' } }} startIcon={<ChangeCircle sx={{ color: '#004d40' }} />}>
                                        complete
                                    </Button>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }}> User ID: {order.userId}</Typography>
                                <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }}> Order ID: {order._id}</Typography>
                                <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }}>shipping address: {order.shippingDetails.address}</Typography>
                                <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }}>contact number: {order.shippingDetails.contactNumber}</Typography>
                                <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }}> delivery type: {order.shippingDetails.orderType}</Typography>
                                <Typography style={{ fontWeight: 500, fontSize: '1.2rem' }}> products in order:</Typography>
                                {order.cartItems.map((item) =>
                                    (<Typography style={{ fontSize: '1.1rem' }}>name:  {item.name}, price:  {item.price}, quantity:  {item.quantity}</Typography>)

                                )}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
         
    )
}

export default Order