// graphql/schema.ts

import { builder } from "./builder";
import "./types/Link"
import "./types/User"

export const schema = builder.toSchema()
