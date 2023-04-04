"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const router = (0, express_1.Router)();
// routes
router.get('/', messageController_1.getAllMessages);
router.post('/', messageController_1.createMessage);
router.get('/:id', messageController_1.getMessage);
router.put('/:id', messageController_1.updateMessage);
router.delete('/:id', messageController_1.deleteMessage);
exports.default = router;
