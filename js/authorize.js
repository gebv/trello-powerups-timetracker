var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

t.render(function () {
    return t.sizeTo('#content')
                .done();
});

var authenticationSuccess = function (res) { console.log('Successful authentication', res, this); };
var authenticationFailure = function () { console.log('Failed authentication'); };

document.getElementById('BtnAuth').addEventListener('click', function () {
    return Trello.authorize({
        type: 'popup',
        name: 'Request access to TrelloAPI for TimeTracker',
        scope: {
            read: 'true'
        },
        expiration: 'never',
        success: authenticationSuccess,
        error: authenticationFailure
    });
})
