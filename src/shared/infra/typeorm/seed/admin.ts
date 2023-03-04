import { hash } from "bcryptjs";

import { AppDataSource } from "../data-source";

async function create() {
    const password = await hash("admin", 8);

    const { isInitialized } = AppDataSource;
    if (!isInitialized) {
        await AppDataSource.initialize();
    }

    await AppDataSource.query(
        `INSERT INTO USERS("name", "email", "password", "isAdmin", "driver_license")
         SELECT 'Admin', 'admin@rentalx.com', '${password}', true, 'ASD-1243'
         WHERE NOT EXISTS (
         SELECT ID FROM USERS WHERE LOWER(NAME) = 'admin')`
    );
}

create().then(() => console.log("User admin created"));
