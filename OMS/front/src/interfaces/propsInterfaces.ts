
import { options } from "./interfacesForUtils";
import { OrderInterface } from "./ordersInterface";

export interface pApproveCancel {
    open: boolean;
    handleClose: () => void;
    _order: OrderInterface;
    handleChangeStatus: (
      order: OrderInterface,
      _status: options["status"]
    ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  }

export interface HeaderProps {
    openSignUp: () => void;
}

export interface orderProps {
    order: OrderInterface;
    handleChangeStatus: (
      order: OrderInterface,
      _status: options["status"]
    ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  }

export interface JoinRequestProps {
  open: boolean;
  handleClose: () => void;
}

export interface SignUpProps {
    open: boolean;
    handleClose: () => void;
}