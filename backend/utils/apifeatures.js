// class ApiFeatures {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     search() {
//         const keyword = this.queryStr.keyword
//             ? {
//                 name: {
//                     $regex: this.queryStr.keyword,
//                     $options: "i",
//                 },
//             }
//             : {};

//         // console.log(keyword);
//         this.query = this.query.find({ ...keyword });
//         return this;
//     }

// }

// module.exports = ApiFeatures;

// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import { v4 as uuid } from "uuid";
// import { v2 as cloudinary } from "cloudinary";
// import { getBase64, getSockets } from "../lib/helper.js";


const emitEvent = (req, event, users, data) => {
    console.log("emitting event", event);
}

const deleteFilesFromCloudinary = async (public_ids) => {

}

export { emitEvent, deleteFilesFromCloudinary }

