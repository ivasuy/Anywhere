import userModel from "../models/userModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";


export const getUserLocation = function (req, res) {
    // const location = 
    res.json({
        "message": "user recieved"
    })
}



export const updateUserLocation = async (req, res) => {

    const userId = req.user._id;
    const { longitude, latitude } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update user's location
        user.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        await user.save();

        res.json({ success: true, message: 'User location updated successfully', user });
    } catch (error) {
        console.error('Error updating user location:', error);
        res.status(500).json({ success: false, message: 'Failed to update user location' });
    }
};



export const findUsersAround = async function (req, res) {
    const currentUser = req.user;
    const { longitude, latitude, maxDistance } = req.body; // Assuming longitude and latitude are provided in the request body

    try {
        const users = await userModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: maxDistance
                }
            }
        });

        // console.log("users loda", users)

        res.json({ success: true, users });
    } catch (error) {
        console.error('Error finding users nearby:', error);
        res.status(500).json({ success: false, message: 'Failed to find users nearby' });
    }
};


// async function findUsersWithinDistanceRange(maxDistance) {

//     const currentUser = req.user

//     const users = await userModel.find({
//         location: {
//             $near: {
//                 $geometry: {
//                     type: "Point",
//                     coordinates: [currentUser.location.coordinates[1], currentUser.location.coordinates[0]]
//                 },
//                 $maxDistance: maxDistance // in meters
//             }
//         }
//     });
//     return users;
// }
