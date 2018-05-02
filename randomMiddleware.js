var something = 5; 
module.exports = function(req, res, next){
    console.log('hi!', something++);
    next();
}