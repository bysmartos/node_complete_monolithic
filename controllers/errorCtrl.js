const errorCtrl = {


    getError: (req, res) => {
        res.status(404).send('404')
      }
}

export default errorCtrl;