import { Response, Request } from "express";

import bannersServices from "./service";

const getByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    const response = await bannersServices.getByCategory(category);
    res.status(200).json(response);
  } catch (error) {
    return res.status(404).send("error")
  }
};

const getAllBanners = async (req: Request, res: Response) => {
    try {
      const response = await bannersServices.getAllBanners();
      res.status(200).json(response);
    } catch (error) {
      return res.status(404).send("error")
    }
  };

export default {
  getByCategory,
  getAllBanners
};
