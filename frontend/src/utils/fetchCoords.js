// // const options = {
// //     enableHighAccuracy: true,
// //     // timeout: 10000,
// // };

// export const fetchCoords = async (options) => {
//     try {
//         const watchId = await navigator.geolocation.watchPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 console.log("Coordinates fetched successfully", { latitude, longitude });
//                 localStorage.setItem('userCoordinates', JSON.stringify({ latitude, longitude }));
//             },
//             (error) => {
//                 console.log("Error occurred while fetching user location", error);
//             },
//             enableHighAccuracy: true,// Pass the options object to watchPosition
//         );

//         // Return a cleanup function to clear the watcher when component unmounts
//         return () => navigator.geolocation.clearWatch(watchId);
//     } catch (error) {
//         console.log("Failed to fetch user location", error);
//     }
// };

export const fetchCoords = async (options) => {
    try {
        const watchId = await new Promise((resolve, reject) => {
            const successCallback = (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Coordinates fetched successfully lode", { latitude, longitude });
                localStorage.setItem('userCoordinates', JSON.stringify({ latitude, longitude }));
                resolve(position);
            };

            const errorCallback = (error) => {
                console.log("Error occurred while fetching user location", error);
                reject(error);
            };

            // Start watching position with provided options
            // const id = navigator.geolocation.watchPosition(successCallback, errorCallback, options);
            const id = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

            // Resolve the promise with the watchId
            resolve(id);
        });

        // Return a cleanup function to clear the watcher when component unmounts
        return () => navigator.geolocation.clearWatch(watchId);
    } catch (error) {
        console.log("Failed to fetch user location", error);
    }
};

