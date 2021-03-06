'use strict';

class WakandaAuthenticator {

    constructor(requestSender) {
        this.requestSender = requestSender;
    }

    authenticate(email, token, onSuccess, onError) {
        var options = {
            method: 'GET',
            url: 'https://wakanda-security.herokuapp.com/verifyToken?email=' + email + "&token=" + token
        };

        this.requestSender.request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log('Authenticator response: ' + response.statusCode);

            if(response.statusCode === 200) {
                onSuccess.apply(this);
            } else {
                onError.call(this, response.statusCode);
            }
        });
    }
}

module.exports = WakandaAuthenticator;