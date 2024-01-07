export interface options {
    orderType: "express" | "regular" | "pickup";
    status: "processing" | "sent" | "accepted" | "cancelled";
    price: { minPrice: number; maxPrice: number };
    orderTime: string;
    userId: string;
  }

export  type tStatuses = options["status"][];

export  type tOrderTypes = options["orderType"][];

export  interface tSelectedOptions {
    orderType: tOrderTypes;
    status: tStatuses;
    price: { minPrice: number; maxPrice: number };
    orderTime: string;
  }
  
