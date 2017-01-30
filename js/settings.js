var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var doneListName = document.getElementById('SettingsField-NameListOfDone');
var progressListName = document.getElementById('SettingsField-NameListOfInProgress');

t.render(function () {
    return Promise.all([
        t.get('board', 'shared', 'doneListName'),
        t.get('board', 'shared', 'progressListName')
    ])
        .spread(function (doneListName, progressListName) {
            // TODO: валидация
            doneListName.value = doneListName;
            progressListName.value = progressListName;
        })
        .then(function () {
            t.sizeTo('#content')
                .done();
        })
});

document.getElementById('settings-btn-save').addEventListener('click', function () {
    return t.set('board', 'shared', 'doneListName', doneListName.value)
        .then(function () {
            return t.set('board', 'shared', 'progressListName', progressListName.value);
        })
        .then(function () {
            t.closePopup();
        })
})
