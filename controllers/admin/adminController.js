class adminController {
  adminView(req, res) {
    res.render("admin/adminHome", { layout: "admin/adminHome" });
  }


  adminView2(req, res) {
    res.render("form",);
  }
}

module.exports = adminController;
