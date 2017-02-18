
Мне надо для каждой карточки получить историю действий.
Если создать кнопку авторизации в trello в settings.html то в index.html не сохраняется полученный токен. Это и понятно - разные iframes. Где следует поместить авторизацию, в index.html?

index.html
```
TrelloPowerUp.initialize({
    'show-settings': function (t, options) {
        return t.popup({
            title: 'Settings',
            url: './settings.html',
            height: 184
        });
    },
    'card-badges': function (t, options) {
        return getBadges(t);
    },
    'card-detail-badges': function (t, options) {
        return getBadges(t);
    }
})

var authenticationSuccess = function () { console.log('Successful authentication'); };
var authenticationFailure = function () { console.log('Failed authentication'); };

Trello.authorize({
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});


var getBadges = function (t, jQuery) {
    ...
}

```

Теперь для каждого кто заходит на доску запрашивается доступ к trello. Мне кажется это не правильно. Пожалуйста, совет.

PS Почему нет возможности получить историю через power-up.min.js?


----

I need to get a history of actions for every card. If you create auth button at trello on settings.html, received token will not be saved to index.html. This is because iframes are different. Should i place authorization to index.html?
index.html
```
TrelloPowerUp.initialize({
    'show-settings': function (t, options) {
        return t.popup({
            title: 'Settings',
            url: './settings.html',
            height: 184
        });
    },
    'card-badges': function (t, options) {
        return getBadges(t);
    },
    'card-detail-badges': function (t, options) {
        return getBadges(t);
    }
})

var authenticationSuccess = function () { console.log('Successful authentication'); };
var authenticationFailure = function () { console.log('Failed authentication'); };

Trello.authorize({
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});


var getBadges = function (t, jQuery) {
    ...
}

```
Trello access is requested for every board visitor now. In my opinion this is not correct. Give me an advice on this, please.
P.S. Why is it impossible to get history through power-up.min.js?