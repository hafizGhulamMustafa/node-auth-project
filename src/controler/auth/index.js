const con = require('../../db')
const jwt=require('jsonwebtoken');

exports.signup=(req, resp)=>{

    const data = {
        name: req.body.name
    }
    con.query(`select * from sing_up where name = ?`,[data.name],(err, result) => {
        console.log("error is :", err);
      if (!result?.length) {
        console.log("errors is :", err);
        con.query("INSERT INTO sing_up set ? ", data, (error, result) => {
        console.log("errorssss is :", error,);

          if (error) error;
          resp.send(result);
        });
      } else {
        resp.status(404).json({message: 'User Already Exsit'})
      }
    }
  );
}

exports.signin=(req,res)=>{
  const data ={
    name : req.body.name
  }
  con.query(`select * from sing_up where name = ?`,[data.name],(err, result) => {
    console.log("error is :", err);
  if (!result?.length) {
    res.status(404).json({message: "login name is not found"})
  }
  else{
    const token =jwt.sign({name:data.name},"MERNSTACKDE",{expiresIn:'1h'});

    res.send({message:"successfully login", token})
  }
})

}

exports.getFriendList=(req,res)=>{
  res.send({message:"successfully getFriendList", name:req.user})
}