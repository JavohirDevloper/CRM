const express = require("express");
const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isLoggedIn = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    let decoded = jwt.verify(access_token, config.jwt.secret);

    if (!decoded) {
      throw new UnauthorizedError("Unauthorized.");
    }

    if (decoded.role === "admin" || decoded.role === "user") {
      req.user = decoded.user;
      return next();
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log(error);
    res.status(400).json({ error: "Bad Request" });
  }
};

module.exports = isLoggedIn;
