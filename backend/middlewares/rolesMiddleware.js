module.exports = (rolesArr) => {
  return function (req, res, next) {
    let hasRole = false;
    req.user.roles.forEach((role) => {
      if (rolesArr.includes(role)) {
        hasRole = true;
      }
    });

    if (!hasRole) {
      return res.status(403).json({
        code: 403,
        message: "Access denied",
      });
    }
    next();
  };
};
