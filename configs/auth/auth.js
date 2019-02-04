
module.exports = {
    fbAuth : {
        clientID : '2010782642557410',
        clientSecret : 'd85c20918d312fc87572229043c09a6c',
        callbackURL : 'http://localhost:3000/auth/facebook/cb',
        profileFields : ['email','displayName']
    },
    ggAuth : {
        clientID : '226093718016-m71lnud47u7ulii8mkvdjgg76s9krd9q.apps.googleusercontent.com',
        clientSecret : 'qSCFLmOI1eufFyIgnPIAAJIH',
        callbackURL : 'http://localhost:3000/auth/google/cb',
        profileFields : ['email','displayName']
    }
}