// module.exports = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.session || !req.session.AgntDtl) {
//       return res.redirect('/login');
//     }

//     const roleId = req.session.AgntDtl.Roleid;

//     if (!allowedRoles.includes(roleId)) {
//       return res.status(403).render('errors/403'); // or redirect
//     }

//     next();
//   };
// };


module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // No session → go to login
    if (!req.session || !req.session.AgntDtl) {
      return res.redirect('/login');
    }

    const roleId = req.session.AgntDtl.Roleid;

    // Role not allowed → logout immediately
    if (!allowedRoles.includes(roleId)) {
      return req.session.destroy(err => {
        if (err) {
          console.error('Session destroy error:', err);
          return res.status(500).send('Internal error');
        }

        res.clearCookie('connect.sid'); // very important
        return res.redirect('/logout'); // or '/login'
      });
    }

    // Role allowed → continue
    next();
  };
};


