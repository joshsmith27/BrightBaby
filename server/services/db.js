module.exports = {
  dbGetter: (req)=>{
      return req.app.get('db');
  }
}