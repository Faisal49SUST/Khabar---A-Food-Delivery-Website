import express from 'express'
import { addFood,listFood,removeFood } from '../controllers/foodController.js'

import multer from 'multer'
import path from 'path'

const foodRouter= express.Router();
//Image storage engin

// Image storage engin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);





export default foodRouter;