import express from "express"

import bannersController from "./controllers"

const route = express.Router()

route.get("/category/:category", bannersController.getByCategory)
route.get("/", bannersController.getAllBanners)
// route.get("/:productId",)
// route.get("/:bannerId", )


export default route