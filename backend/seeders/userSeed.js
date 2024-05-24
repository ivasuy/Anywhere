import userModel from "../models/userModel.js";
import { faker } from "@faker-js/faker";
const createUser = async (numUsers) => {
    try {
        const usersPromise = [];

        for (let i = 0; i < numUsers; i++) {
            const tempUser = userModel.create({
                name: faker.person.fullName(),
                username: faker.internet.userName(),
                email: faker.internet.email(),
                bio: faker.lorem.sentence(10),
                password: "1234567890",

            })
            usersPromise.push(tempUser)
        }

        await Promise.all(usersPromise);

        console.log("Users created", numUsers);
        process.exit(1);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { createUser }