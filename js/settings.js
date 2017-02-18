var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var progressListName = document.getElementById('SettingsField-NameListOfInProgress');

t.render(function () {
    return Promise.all([
        t.get('board', 'shared', 'progressListName')
    ])
        .spread(function (progressListNameValue) {
            // TODO: валидация
            progressListName.value = progressListNameValue;
        })
        .then(function () {
            t.sizeTo('#content')
                .done();
        })
});

document.getElementById('settings-btn-save').addEventListener('click', function () {
    return t.set('board', 'shared', 'progressListName', progressListName.value)
        .then(function () {
            t.closePopup();
        })
})
