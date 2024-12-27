import Joi from 'joi';

interface Payload {
  [key: string]: unknown;
}

type JoiSchemaKey = keyof typeof JoiSchema;

interface ValidationResult {
  error: boolean;
  message: string;
}

export default async (
  payload: Payload,
  key: JoiSchemaKey
): Promise<ValidationResult> => {
  const schema = JoiSchema[key];

  const validate = schema.validate(payload);
  let error = false;
  let message = 'Success Validation';

  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, '');
    error = true;
  }

  return { error, message };
};

const addMovie = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  rating: Joi.number().required(),
  streamingLink: Joi.string().required(),
});

const updateMovie = Joi.object({
  title: Joi.string(),
  genre: Joi.string(),
  rating: Joi.number(),
  streamingLink: Joi.string(),
});

const JoiSchema = {
  addMovie,
  updateMovie,
};
