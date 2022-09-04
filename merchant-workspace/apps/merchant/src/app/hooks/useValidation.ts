import * as Joi from "joi";
import { ValidationResult } from "joi";

type TValidateValues = <T>(values: T, schema: Joi.Schema | Joi.SchemaLike) => Record<string, string> | undefined;

export const useValidation = (): TValidateValues => {
  const validateValues = <T>(values: T, schema: Joi.Schema | Joi.SchemaLike): Record<string, string> | undefined => {
    const { error } = Joi.compile(schema).validate(values);

    if (!error) {
      return undefined;
    }

    const errors: Record<string, string> = {};

    for (const item of error.details) {
      const name = item.context?.key ?? item.context?.label;
      if (!name) {
        continue;
      }
      errors[name] = item.message;
    }

    return errors;
  };

  return validateValues;
};
