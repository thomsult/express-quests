const validateUser = (req, res, next) => {

    const { firstname, lastname, username, language	, city } = req.body;
    const errors = [];

    for (const [key, value] of Object.entries({firstname, lastname, username, language, city})) {
        if (value == null){
            errors.push({ field: key, message: "This field is required" })
        }else if (value.length >= 255){
            errors.push({ field: key, message: "Should contain less than 255 characters" });
        }


      }
    if (errors.length) {
      res.status(422).json({ validationErrors: errors,});
    } else {
      next();
    }
  
  };
    
  module.exports = {
    validateUser,
  };
  
  
  // in app.js
  
  

  
  
  