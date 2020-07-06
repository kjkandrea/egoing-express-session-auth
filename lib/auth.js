module.exports = {
  IsOwner: function (req, res){
    if(req.session.is_logged_in){
      return true;
    } else {
      return false;
    }
  },
  StatusUI: function (req, res) {
    let authStatusUI = '<a href="/auth/login">login</a>'
    if(this.IsOwner(req, res)){
      authStatusUI = `<a href="/auth/logout">${req.session.nickname} logout</a>`
    }
  
    return authStatusUI;
  }
}