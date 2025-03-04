import createHttpError from "http-errors";
import pkg from "jsonwebtoken";
import { config } from "../config/config.js";

const {verify} = pkg

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(createHttpError(401, "Authorization token is required"));
  }

  

  try {

    const parsedToken = token.split(" ")[1];

    const decoded = verify(parsedToken, config.jwtSecret);

    //type casting
    const _req = req;

    //adding userID to the Request
    _req.userId = decoded.sub;
    next();
  } catch (error) {
    return next(createHttpError(401,"Token expired."));
    console.log(error)
  }
};

export default authenticate;