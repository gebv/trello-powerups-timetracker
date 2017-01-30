

TrelloPowerUp.initialize({
    'show-settings': function (t, options) {
        return t.popup({
            title: 'Settings',
            url: './settings.html',
            height: 184
        });
    },
    'card-badges': function (t, card) {
        return {
            dynamic: function () {
                return {
                    title: 'Detail Badge', // for detail badges only
                    text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
                    color: 'green',
                    refresh: 10
                }
            }
        }
    }
})