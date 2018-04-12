module.exports = {
    login: (req, res) => {
        res.send({
            successful:true,
            message: 'Welcome to the Jungle!',
            user: req.user,
        });
    },
}