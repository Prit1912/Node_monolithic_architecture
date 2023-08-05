import { getReasonPhrase } from "http-status-codes";
// import { isCelebrateError } from "celebrate";
import { FALLBACK_DEFAULT_MESSAGE } from "../../constants/error/index";

/* eslint-disable max-classes-per-file */
// import util from "util";

export class _BaseCustomError extends Error {
  constructor({ statusCode = 400, message, isOperational = true }) {
    super(message);
    this.name = this.constructor.name;
    this.isCustomError = true;
    this.defaultMessage = FALLBACK_DEFAULT_MESSAGE;
    if (statusCode) {
      try {
        this.defaultMessage = getReasonPhrase(statusCode);
      } catch (e) {
        // will keep the default message
      }
      this.statusCode = statusCode;
    }
    // operational vs programmer errors
    // https://www.joyent.com/node-js/production/design/errors
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerError extends _BaseCustomError {
  constructor(message, statusCode = 500) {
    super({ message, statusCode, isOperational: false });
  }
}

export class CustomError extends _BaseCustomError {
  constructor(message, statusCode = 400) {
    super({ message, statusCode, isOperational: true });
  }
}

export class UnprocessableEntityError extends _BaseCustomError {
  constructor(message) {
    super({ message, statusCode: 422, isOperational: true });
  }
}

export class UnauthorizedError extends _BaseCustomError {
  constructor(message) {
    super({ message, statusCode: 401, isOperational: true });
  }
}

export class ForbiddenError extends _BaseCustomError {
  constructor(message) {
    super({ message, statusCode: 403, isOperational: true });
  }
}

export class DuplicateResource extends _BaseCustomError {
  constructor(message) {
    super({ message, statusCode: 409, isOperational: true });
  }
}

export class BadGateway extends _BaseCustomError {
  constructor(message) {
    super({ message, statusCode: 502, isOperational: true });
  }
}

export class BadRequestError extends _BaseCustomError {
  constructor(message) {
    super({ message, statusCode: 400, isOperational: true });
  }
}
export class TooManyRequestsError extends _BaseCustomError {
  constructor(message) {
    super({ message, statusCode: 429, isOperational: true });
  }
}

const messageToUseExternal = (defaultMessage, error = {}) => {
  if (error.isCustomError) {
    return error.message;
  }
  if (defaultMessage) {
    return defaultMessage;
  }
  if (error.isCustomError && error.defaultMessage) {
    return error.defaultMessage;
  }
  return FALLBACK_DEFAULT_MESSAGE;
};

const messageToUseInternal = (defaultMessage, error = {}, messageInternal) => {
  if (error.isCustomError) {
    return error.message;
  }
  if (messageInternal) {
    return messageInternal;
  }
  return messageToUseExternal(defaultMessage, error);
};

export const errorResponse = ({
  defaultStatusCode = 400,
  defaultMessage,
  messageInternal,
  error,
  req,
  res,
}) => {
  const errorMessage = messageToUseExternal(defaultMessage, error);
  const errorMessageInternal = messageToUseInternal(
    defaultMessage,
    error,
    messageInternal
  );
  const statusCode = error.statusCode ? error.statusCode : defaultStatusCode;
  //   const logMethod = !error.isOperational ? "error" : "info";
  //   log[logMethod](errorMessageInternal, util.inspect(error), log.meta({ req }));
  console.log(errorMessageInternal);
  //   if (!error.isOperational) {
  //     errorHandler.send(util.inspect(error));
  //   }
  res.status(statusCode).send({ error: errorMessage });
};

export const existingCustomErrorOrNew = (error, message) =>
  error && error.isCustomError ? error : new CustomError(message);

/*
 * Format Joi error message so field names (? and other names) are not escaped
 * References:
 *  - https://stackoverflow.com/questions/36881984/joi-js-return-a-weird-error-message
 *  - https://github.com/sideway/joi/issues/2182
 */
const joiMsgFormatter = (errorMsg = "") => errorMsg.replace(/"/g, "");

/*
 * Returns the first error message if its a celebrate error.
 * Returns default error message if no error messgae found.
 */
export const celebrateErrorMsgFromCelebrateError = (error) => {
  let errorMsg = FALLBACK_DEFAULT_MESSAGE;
  if (isCelebrateError(error)) {
    CELEBRATE_SEGMENTS.forEach((segment) => {
      const segmentErrorDetails = error.details.get(segment);
      if (segmentErrorDetails) {
        errorMsg = joiMsgFormatter(segmentErrorDetails.message);
      }
    });
  }
  return errorMsg;
};
