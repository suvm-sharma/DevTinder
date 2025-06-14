
const validateUserBody = function(req){

    const restictedFields = ['email', 'password'];

    for(let key of Object.keys(req.body)){
        if(restictedFields.includes(key)){
            return false;
        }
    }
    
    return true;

}

module.exports = validateUserBody;