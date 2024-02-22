const express = require("express");
const { ForbiddenError } = require("../errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const hasRole = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        throw new UnauthorizedError("User role is not defined.");
      }

      const { role } = req.user;
      console.log(role);
      if (!roles.includes(role)) {
        throw new UnauthorizedError(`This ${role} is not allowed this right!`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};


module.exports = hasRole;
