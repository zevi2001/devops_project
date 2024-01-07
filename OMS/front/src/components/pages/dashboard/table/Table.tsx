import {
  Typography,
  Box,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Modal,
  Skeleton,
} from "@mui/material";
import Order from "../Order";
import TableHeader from "../TableHeader";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchOrders, putOrder } from "../../../../services/ordersService";
import { OrderInterface } from "../../../../interfaces/ordersInterface";
import {
  initialSelectedOptions,
  filterOrdersByPriceRange,
  filterOrdersByDate,
  filterOrdersByOrderType,
  filterOrdersByStatus,
} from "../../../../utils/filtersFuncs";
import { useNavigate } from "react-router";
import TuneIcon from "@mui/icons-material/Tune";
import DoneIcon from "@mui/icons-material/Done";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { filterModalStyle } from "./style";
import { options, tSelectedOptions } from "../../../../interfaces/interfacesForUtils";



function valuetext(value: number) {
  return `${value}$`;
}
const marks = [
  {
    value: 1,
    label: "1 $",
  },
  {
    value: 2000,
    label: "2000 $",
  },
];

export default function Table() {
  const Navigate = useNavigate();
  const [priceValue, setPriceValue] = useState<number[]>([0, 2000]);
  const [dateValue, setDateValue] = useState("0000-00-00");
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderInterface[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<tSelectedOptions>(initialSelectedOptions);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    filterOrders(orders, selectedOptions);
  }, [priceValue, orders, selectedOptions, dateValue]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function getOrders() {
    const temp: void | OrderInterface[] = await fetchOrders();
    if (temp) {
      setOrders(temp);
    } else {
      Navigate("/oms/orders/login?notLoginPopup=true");
    }
  }

  async function filterOrders (
    orders: OrderInterface[],
    selectedOptions: tSelectedOptions
  ) {
    const updatedFilteredOrdersByStatus = filterOrdersByStatus(
      orders,
      selectedOptions.status
    );
    const updatedFilteredOrdersByType = filterOrdersByOrderType(
      updatedFilteredOrdersByStatus,
      selectedOptions.orderType
    );
    const updatedFilteredOrdersByDate = filterOrdersByDate(
      updatedFilteredOrdersByType,
      dateValue
    );
    const updatedFilteredOrdersByPrice = filterOrdersByPriceRange(
      updatedFilteredOrdersByDate,
      priceValue[0],
      priceValue[1]
    );
    setFilteredOrders(updatedFilteredOrdersByPrice);
  }

  const handleStatusCheckboxChange =
    (_option: options["status"]) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedOptions((prevState) => ({
          ...prevState,
          status: [...prevState.status, _option],
        }));
      } else {
        setSelectedOptions((prevState) => ({
          ...prevState,
          status: prevState.status.filter((opt) => opt !== _option),
        }));
      }
    };

  const handleTypeCheckboxChange =
    (_option: options["orderType"]) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedOptions((prevState) => ({
          ...prevState,
          orderType: [...prevState.orderType, _option],
        }));
      } else {
        setSelectedOptions((prevState) => ({
          ...prevState,
          orderType: prevState.orderType.filter((opt) => opt !== _option),
        }));
      }
    };
  const handleChangePrice = (event: Event, newValue: number | number[]) => {
    if (event) {
      setPriceValue(newValue as number[]);
    }
  };
  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const dateObject = new Date(event.target.value);
    const formattedDate = dateObject.toLocaleDateString("en-GB");
    setDateValue(formattedDate);
  };
  const handleResetFilters = () => {
    setDateValue(initialSelectedOptions.orderTime);
    setPriceValue([
      initialSelectedOptions.price.minPrice,
      initialSelectedOptions.price.maxPrice,
    ]);
    setSelectedOptions(initialSelectedOptions);
  };
  const handleChangeStatusButton = (
    order: OrderInterface,
    _status: options["status"]
  ) => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const updatedOrder = await putOrder({ ...order, status: _status });
      if (updatedOrder?.status === _status) {
        const index = filteredOrders.findIndex((o) => o._id === order._id);
        if (index !== -1) {
          const updatedOrders = [...filteredOrders];
          updatedOrders[index] = updatedOrder;
          setFilteredOrders(updatedOrders);
        }
      } else {
        Navigate("/oms/orders/login?notLoginPopup=true");
      }
    };
  };

  return (
    <Box sx={{ marginTop: "7em" }}>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...filterModalStyle, width: 800 }}>
            <Box
              sx={{
                height: "8em",
                width: "100vw",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  style={{ fontWeight: 900 }}
                  sx={{ textDecoration: "underLine" }}
                >
                  Filters:
                </Typography>
              </Box>
              <Box sx={{ display: "flex", height: "10em", width: "25em" }}>
                <Box sx={{ margin: "8px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: 900 }}
                    sx={{ width: "2.5em" }}
                  >
                    price:
                  </Typography>
                  <Slider
                    sx={{
                      width: "12em",
                      color: "#009688",
                      marginLeft: "1em",
                      marginTop: "0.5em",
                    }}
                    getAriaLabel={() => "Temperature range"}
                    value={priceValue}
                    onChange={handleChangePrice}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={2000}
                    min={1}
                    step={10}
                    marks={marks}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", height: "10em", width: "25em" }}>
                <Box sx={{ margin: "8px" }}>
                  <Typography
                    variant="h6"
                    style={{ fontWeight: 900 }}
                    sx={{ width: "25em" }}
                  >
                    status:
                  </Typography>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    {initialSelectedOptions.status.map(
                      (option, index) =>
                        option && (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                sx={{ color: "#009688" }}
                                checked={selectedOptions.status.some(
                                  (opt) => opt === option
                                )}
                                onChange={handleStatusCheckboxChange(option)}
                              />
                            }
                            label={option}
                          />
                        )
                    )}
                  </FormGroup>
                </Box>
              </Box>

              <Box sx={{ display: "flex", height: "10em", width: "25em" }}>
                <Box sx={{ margin: "8px" }}>
                  <Typography
                    noWrap
                    variant="h6"
                    style={{ fontWeight: 900 }}
                    sx={{ width: "9em" }}
                  >
                    Delivery type:
                  </Typography>
                  <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                    {initialSelectedOptions.orderType.map(
                      (option, index) =>
                        option && (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={selectedOptions.orderType.some(
                                  (opt) => opt === option
                                )}
                                onChange={handleTypeCheckboxChange(option)}
                              />
                            }
                            label={option}
                          />
                        )
                    )}
                  </FormGroup>
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", height: "10em", marginLeft: "0.5em" }}
              >
                <Stack spacing={3}>
                  <Typography variant="h6" style={{ fontWeight: 900 }}>
                    Date:
                  </Typography>

                  <input
                    onChange={handleChangeDate}
                    type="date"
                    style={{
                      backgroundColor: "#009688",
                      fontFamily: "sans-serif",
                      border: "none",
                      borderRadius: "1em",
                      height: "2em",
                      width: "15em",
                      marginLeft: "2em",
                      padding: "0.5em",
                    }}
                  ></input>
                </Stack>
              </Box>
              <Box sx={{ marginTop: "3em" }}>
                <Button
                  startIcon={<DoneIcon />}
                  sx={{
                    color: "black",
                    width: "9em",
                    backgroundColor: "#009688",
                    "&:hover": { backgroundColor: "#80cbc4" },
                  }}
                  onClick={handleClose}
                >
                  See results
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Box
        sx={{
          width: "100vw",
          height: "3em",
          display: "flex",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <TableHeader />
        <Box sx={{ display: "flex", width: "40em", ml: "2.8em" }}>
          <Button
            onClick={handleOpen}
            sx={{
              color: "white",
              border: "none",
              width: "9em",
              backgroundColor: "#26a69a",
              "&:hover": { border: "none", backgroundColor: "#80cbc4" },
            }}
            startIcon={<TuneIcon />}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            onClick={handleResetFilters}
            sx={{
              color: "white",
              border: "none",
              backgroundColor: "#26a69a",
              marginLeft: "0.5em",
              "&:hover": { border: "none", backgroundColor: "#80cbc4" },
            }}
            startIcon={<RotateLeftRoundedIcon sx={{ color: "white" }} />}
          >
            reset filters
          </Button>
        </Box>
      </Box>
      {filteredOrders.length === 0 && ( 
      <Stack spacing={1} sx={{display: 'flex', alignItems: 'center'}}>
       {new Array(8).fill(1).map((a) => (<Skeleton key={a} variant="rounded" width={'95vw'} height={'5em'} />))};
     </Stack>
      )}
      <Box
        sx={{
          width: "100vw",
          minHeight: "50vh",
          display: "flex",
          justifyItems: "center",
          flexDirection: "column",
        }}
      >
        {filteredOrders.map((order) => (
          <Order order={order} handleChangeStatus={handleChangeStatusButton} />
        ))}
      </Box>
    </Box>
  );
}
