import { Request, Response } from "express";
import categoriesServices from "./services"

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoriesServices.getAllCategories()
        if (!categories) {
            return res.status(401).json({ message: 'No categories found' })
        }
        res.status(200).json(categories)
        
    } catch (error) {
        error = error as unknown as string
        console.log(error);
        res.status(404).send(error)
        
    }
}

const setClick = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const response = await categoriesServices.setClick(id)
        if (!response) {
            return res.status(401).json({ message: 'No categories found' })
        }
        res.status(200).json(response)
    } catch (error) {
        error = error as unknown as string
        console.log(error);
        res.status(404).send(error)
    }
}

const createCategory = async (req: Request, res: Response) => {
    try {
        const category = req.body
        const response = await categoriesServices.createCategory(category)
        if (!response) {
            return res.status(401).json({ message: 'failed to create!' })
        }
        res.status(200).json(response)
    } catch (error) {
        error = error as unknown as string
        console.log(error);
        res.status(404).send(error)
    }
}

const createCategories = async (req: Request, res: Response) => {
    try {
        const category = req.body
        const response = await categoriesServices.createCategories(category)
        if (!response) {
            return res.status(401).json({ message: 'failed to create!' })
        }
        res.status(200).json(response)
    } catch (error) {
        error = error as unknown as string
        console.log(error);
        res.status(404).send(error)
    }
}



export default {
    getAllCategories,
    setClick,
    createCategory,
    createCategories
}