module.exports = {
    login: (req, res) => {
        res.send({
            successful:true,
            message: 'Welcome to the Jungle!',
            user: req.user,
        });
    },
    IsLogedIn: (req,res)=>{
        console.log(req.isAuthenticated());
        res.send({successful: req.isAuthenticated()
        })
    },
    logout: (req, res) => {
        req.session.destroy(()=>{
            res.send({successful: true, loggedIn: false})
        })
    }
}