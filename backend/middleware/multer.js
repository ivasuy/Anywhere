import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for buffer handling
const multerUpload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100, //size limit 10MB
    }
});

const singleAvatar = multerUpload.single("avatar");
const attachmentsMulter = multerUpload.array("files", 10); // Handle multiple files

export { singleAvatar, attachmentsMulter };
