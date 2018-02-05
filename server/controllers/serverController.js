module.exports = {
    catchAll : (request, response) =>{
        response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));        
    }
}