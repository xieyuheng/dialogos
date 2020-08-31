import Ajv from "ajv"
import assert from "assert"
import * as ut from "../ut"

const ajv = new Ajv()

// {
//   const validate = ajv.compile(schema)
//   const valid = validate(data)
//   if (!valid) console.log(validate.errors)
// }

// console.log var valid = ajv.validate(schema, data);
