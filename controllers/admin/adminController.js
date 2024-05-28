class adminController {

    adminView(req, res) {
        res.render('admin/adminHome', { layout: 'adminLayout' })
    }


}

module.exports = adminController;