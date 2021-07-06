
import { Database } from "@nozbe/watermelondb";
import SQLiteDatabaseAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schemas } from "./schema";
import { User } from "./models/User";
import { Car } from "./models/Car";

const adapter = new SQLiteDatabaseAdapter({
    schema: schemas, 

})

export const database = new Database({
    adapter,
    modelClasses: [ User, Car ],
    actionsEnabled: true
});