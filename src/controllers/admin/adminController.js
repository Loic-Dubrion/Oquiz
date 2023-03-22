
const adminController = {

  async renderAdminPage(req, res, next) {
    try {
      res.render('admin/admin');
    } catch (err) {
      res.status(500);
    }
  },

}

module.exports = adminController;