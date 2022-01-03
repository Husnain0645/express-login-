const User = require('./../models/user');


exports.allusers = (

  (req, res) => {
    User.findAll()
    .then (lists => {
        res.status(200).send(lists);
    })
        .catch(err => console.log(err));
    
  });

