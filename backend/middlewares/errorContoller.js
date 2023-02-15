//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    return res.status(code).send({message: error});
 }

//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if(errors.length > 1) {
       const formattedErrors = errors.join(' ');
       return res.status(code).send({message: formattedErrors, fields:     fields});
     } else {
        return res.status(code).send({message: errors, fields: fields})
     }
 }

 //error controller function
 module.exports = (err, req, res, next) => {
 try {
     if(err.name === 'ValidationError') return err = handleValidationError(err, res);
     if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
     } catch(err) {
         res.status(500).send('An unknown error occurred.');
 }
 }