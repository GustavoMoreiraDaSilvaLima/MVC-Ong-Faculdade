class adminController {

    adminView(req, res) {
        res.render('admin/adminhome', { layout: 'adminlayout' })
    }


}

module.exports = adminController;