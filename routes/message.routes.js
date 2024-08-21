import express from "express";
import {createMessage, getMessage, updateMessage, deleteMessage} from '../controllers/message.controllers.js'

const router = express.Router();

router.route('/').post(createMessage).get(getMessage)
router.route('/:messageId').put(updateMessage).delete(deleteMessage)

export default router;