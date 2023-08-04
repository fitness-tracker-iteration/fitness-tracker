const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = {};
const { User } = require('../models/userModel')

userController.verifyUser = (req, res, next) => {
// we will be recieving username and password in the request body. check if username exists and if so check if password matches. If match set authenticated to true in res.locals and pass along to next middleware. otherwise call global error handler with message user not authenticated and status code 401.
    const { username, password } = req.body;
    User.findOne({ username }).then(async (user) => {
        if (!user) {
            return next({
                log: 'error in userController.verifyUser',
                message: {
                  err: `No user found`
                }})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); 

            if (isPasswordValid) {

                const token = jwt.sign(
                    {userId: user._id }, 
                    process.env.JWT_SECRET || 'default-secret',
                    {expiresIn: '2h'}
                )

                res.cookie('usertoken', token, {
                    httpOnly: true, 
                    domain: 'localhost',
                    path: '/',
                    expires: new Date(Date.now() + 9000000)
                })
                res.locals = {
                    authenticated: true,
                    _id: user._id, 
                    token: token
                } 
                return next();
            } else {
                return next({
                    log: 'error in userController.verifyUser',
                    status: 401,
                    message: {
                      err: `User not authenticated`
                    }})
            }}).catch(err => next({
            log: 'error in userController.verifyUser',
            message: {
              err: `Error trying to find user: ${err}`
            }}))
}


userController.createUser = async (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;

    if (!username || !password || !firstName || !lastName)
    return next({
        log: 'Missing username/password in UserController.createUser',
        message : {err: 'An error occured'}
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create({ 
        username, 
        password: hashedPassword, 
        firstName, 
        lastName, 
    }) 
    .then((user) => {
        res.locals._id = user._id;
        res.locals.user = user; 
        return next();
    })
    .catch((err) => {
        return next({
            log: 'Error occurred in userController.createUser',
            message: {err:  `Error trying to create user: ${err}`},
        });
    });
};

userController.updateStats = (req, res, next) => {
    const { age: newAge, height: newHeight, sex: newSex, goal: newGoal, weight: newWeight } = req.body;
    const { ssid } = req.cookies;
    User.findByIdAndUpdate({_id: ssid}, {age: newAge, height: newHeight, sex: newSex, goal: newGoal, weight: newWeight}, {new: true})
    .then(user => {
        console.log(user);
        return next();
    }).catch(err => next({
        log: 'error in userController.updateStats',
        message: {
          err: `Error: ${err}`
        }}))
}

userController.getStats = (req, res, next) => {
    const { ssid } = req.cookies;
    User.findById({_id: ssid})
    .then(user => {
      console.log(user);
      const { age, sex, height, weight, goal } = user;
      res.locals.userInfo = { age: age, sex: sex, height: height, weight: weight, goal: goal }
      return next();
    }).catch (err => next({
      log: 'error in statsController.getCookies',
          message: {
            err: `Error: ${err}`
    }}))
}


module.exports = userController;