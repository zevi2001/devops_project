import { ExitToApp, PersonAdd } from "@mui/icons-material"
import { AppBar, Box, Button, Typography } from "@mui/material"
import '../../../index.css'
import { useNavigate } from "react-router";
import { HeaderProps } from "../../../interfaces/propsInterfaces";




const Header: React.FC<HeaderProps> = ({ openSignUp }) => {
    const Navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.removeItem('access_token');
        Navigate('/oms/orders/login')
    }


    return (
        <AppBar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pl: '1em', pr: '2.5em', alignItems: 'center', width: '100vw', height: '10vh', top: '0', backgroundColor: '#4db6ac', position: 'fixed' }}>
            <Box>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap');
                </style>
                <Typography variant="h4" fontFamily={'Barlow'} fontStyle={'italic'}>ORDER MANAGEMENT SYSTEM </Typography>
            </Box>
            <Box>
                <Button size="large" variant="contained" sx={{ backgroundColor: '#4db6ac', color: 'white' , '&:hover': {
                      backgroundColor: '#80cbc4'
                    } }} onClick={openSignUp}><PersonAdd />  Add admin</Button>
                <Button size="large" variant="contained"  sx={{ml:'1em', backgroundColor: '#4db6ac', color: 'white', '&:hover': {
                      backgroundColor: '#80cbc4'
                    } }} onClick={handleLogOut}><ExitToApp /> Sign out</Button>
            </Box>
        </AppBar>
    )
}
export default Header