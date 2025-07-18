function checkrole(requiredrole) {
  return function (req, res, next) {
    console.log(req)
    if (!req.user || req.user.role !== requiredrole) {
        return res.status(403).json({"access denied": "you cant access this feature"})
    }
    next()
  };
}

module.exports = checkrole
