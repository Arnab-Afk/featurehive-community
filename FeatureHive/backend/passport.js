import passport from 'passport';
import Strategy from 'passport-google-oauth20';

let GoogleStrategy = Strategy.Strategy;

passport.use(new GoogleStrategy({
    clientID: "GCLOUD_CLIENT_ID",
    clientSecret: "GCLOUD_CLIENT_SECRET",
    callbackURL: "http://localhost:8000/auth/google/callback", // change to /api/auth/google/callback
    passReqToCallback: true,
    hd:'featurehive.live',
    hostedDomain:"featurehive.live",
},
     function (request,accessToken, refreshToken, profile, cb,done) {
        
            return (done(null, profile) );
        
    }
));


passport.serializeUser((user, done) => {
    done(null, user)
    
})

passport.deserializeUser((user, done) => {
    done(null, user)
})