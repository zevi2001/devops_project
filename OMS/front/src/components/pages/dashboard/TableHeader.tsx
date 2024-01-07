import { Box, Typography} from "@mui/material"


function TableHeader() {


    return (
        <Box sx={{ height: '10vh', minHeight: '10vh', width: '100vw', display: 'flex', flexDirection: 'column', marginTop:'2em' }}>
            <Box sx={{ height: '3em', display: 'flex', width: '74.4vw'}}>
                <Box sx={{width:'70vw', display:'flex', marginLeft:'3em', justifyContent:'space-around'}}>
                <Typography variant="h5"  sx={{padding: '0em 2.8em 0em 1.2em' }}>Order ID</Typography>
                    <Typography variant="h5" >Price</Typography>
                    <Typography variant="h5" sx={{pl: '1em'}}>Date</Typography>
                    <Typography variant="h5" sx={{pl:'1em'}} >Delivery</Typography>
                    <Typography variant="h5"> Status</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default TableHeader


