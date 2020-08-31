import Ajv from "ajv"
import assert from "assert"
import * as ut from "../ut"

const ajv = new Ajv()

{
  const data = {
    first_name: "George",
    last_name: "Washington",
    birthday: "1732-02-22",
    address: {
      street_address: "3200 Mount Vernon Memorial Highway",
      city: "Mount Vernon",
      state: "Virginia",
      country: "United States",
    },
  }

  const inline_schema = {
    first_name: "string",
    last_name: "string",
    birthday: "string|date",
    address: {
      street_address: "string",
      city: "string",
      state: "string",
      country: "string",
    },
  }

  const schema = {
    type: "object",
    properties: {
      first_name: { type: "string" },
      last_name: { type: "string" },
      birthday: { type: "string", format: "date" },
      address: {
        type: "object",
        properties: {
          street_address: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          country: { type: "string" },
        },
      },
    },
  }

  const validate = ajv.compile(schema)
  const valid = validate(data)
  if (!valid) console.log(validate.errors)
}
