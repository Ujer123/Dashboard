import Message from '../models/message.models.js';
import asyncHandler from 'express-async-handler';

// @method POST
// @method {string} name - message's name


const createMessage = asyncHandler(async (req, res) => {
    try{
        const{name, email, phoneno} = req.body;

        if(name && email && phoneno){
            const newMessage = new Message({
                name: name,
                email: email,
                phoneno: phoneno,
                // price: price,
            });

            const createdMessage = await newMessage.save();

            res.json({
                code: 200,
                remark: 'message created',
            });
        }else{
            res.status(400);
            res.json({
                code: 400,
                remark: 'name and email are required',
            });
        }
    }catch(error){
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: 'internal server error',
        });
        
    }
});

const getMessage = asyncHandler(async(req, res)=>{
    try{
        let filterObject = {
            isArchived: req.query.isArchived === undefined ? false : req.query.isArchived
        }

        if(req.query.search){
            filterObject.name = {
                $regex: req.query.search,
                $options: 'i'
            }
        }

        const message = await Message.find(filterObject);

        res.json({
            code: 200,
            remark: 'success',
            data: message,
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: 'failed',
        });
        
    }
});


const updateMessage = asyncHandler(async (req, res) => {
    try {
        const messageId = req.params.messageId; // Route parameter should match
        const message = await Message.findById(messageId);

        if (message) {
            const { name, email, phoneno, archivedToggle } = req.body;
            message.name = name || message.name;
            message.email = email || message.email;
            message.phoneno = phoneno || message.phoneno;
            // message.price = price || message.price;
            message.isArchived = archivedToggle === undefined ? message.isArchived : archivedToggle;

            await message.save();

            res.json({
                code: 200,
                remark: 'message updated',
            });
        } else {
            res.status(404).json({
                code: 404,
                remark: 'message not found',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            remark: 'failed',
        });
    }
});




const deleteMessage = asyncHandler(async (req, res) => {
    try {
        const messageId = req.params.messageId; // Use messageId from the route
        console.log(`Deleting message with ID: ${messageId}`);

        const message = await Message.findByIdAndDelete(messageId);

        if (!message) {
            return res.status(404).json({
                code: 404,
                remark: 'Message not found',
            });
        }

        res.json({
            code: 200,
            remark: 'Message deleted',
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            code: 500,
            remark: 'Failed to delete message',
        });
    }
});


export {createMessage, deleteMessage, getMessage, updateMessage}