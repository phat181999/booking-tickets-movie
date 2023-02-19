"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization");
    try {
        if (token && token.split("")[1] != null) {
            jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
                if (error) {
                    return res
                        .status(401)
                        .json({ succeses: false, message: "Token Expired" });
                }
                req.data = data;
                next();
            });
        }
        else {
            res.status(403).json({ succeses: false, message: "UnAuthorized" });
        }
    }
    catch (err) {
        res.status(403).json({ success: false, message: "UnAuthorized" });
    }
});
exports.Authentication = Authentication;
