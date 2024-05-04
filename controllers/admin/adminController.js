class adminController {

    adminView(req, res) {
        res.render('admin/adminHome', { layout: 'admin/adminHome' })
    }


}

module.exports = adminController;