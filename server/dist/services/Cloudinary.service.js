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
exports.uploadCloud = void 0;
const fs = require("fs");
const cloudinary = require("../middlwares/uploadImages");
const uploadCloud = (locaFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    // locaFilePath: path of image which was just
    // uploaded to "uploads" folder
    var mainFolderName = "main";
    // filePathOnCloudinary: path of image we want
    // to set when it is uploaded to cloudinary
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;
    return cloudinary.uploader
        .upload(locaFilePath, { public_id: filePathOnCloudinary })
        .then((result) => {
        // Image has been successfully uploaded on
        // cloudinary So we dont need local image
        // file anymore
        // Remove file from local uploads folder
        fs.unlinkSync(locaFilePath);
        return {
            message: "Success",
            url: result.url,
        };
    })
        .catch((error) => {
        // Remove file from local uploads folder
        fs.unlinkSync(locaFilePath);
        return { message: "Fail" };
    });
});
exports.uploadCloud = uploadCloud;
