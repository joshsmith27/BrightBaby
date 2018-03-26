module.exports = {
  dbGetter: (req, res, next)=>{
      return req.app.get('db');
  }
}