import cloudinary from "../config/cloudinary.js";

const testUpload = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        )

        return res.status(200).json({
            message: 'Upload successfull',
            url: result.secure_url
        })
    } catch (err) {

        return res.status(500).json({
            message: "Upload Failed"
        })
    }
}
export { testUpload };