var retainValue = function (value) {
    return value.toFixed(2);
};
moment.relativeTimeRounding(retainValue);

var isFullLoaded = false;
var data = {};

var calcWorkLog = function(plistname, actions) {

    return _(actions)
        .filter(function (item) {
            return item.type == 'createCard' || item.type == 'updateCard'
        })
        .map(function (item) {
            item.ts = (+new Date(item.date));

            return item
        })
        .orderBy(['ts'], ['asc'])
        .map(function (v) {
            v.tracked = false;
            v.list = function(opt) {
                if (opt.list) {
                    return opt.list.name
                }
                if (opt.listAfter) {
                    return opt.listAfter.name
                }
                return ""
            }(v.data)

            if (v.list == plistname) {
                v.tracked = true
            }

            return {
                list: v.list,
                date: v.date,
                tracked: v.tracked,
                total: 0
            };
        })
        .reduce(function(r, v) {
            var total = r.total || 0;
            if (r.tracked) {
                total += ((new Date(v.date)) - (new Date(r.date)))
            }

            return {
                total: total,
                date: v.date,
                tracked: v.tracked
            }
        })
}
var Promise = TrelloPowerUp.Promise;
var getBadges = function (t, jQuery) {

    return t
        .card('id', 'name', 'shortLink')
        .then(function(ctx) {
            var key = 'card-'+ctx.id+'-estemite';
            return Promise.all([
                t.get('board', 'shared', key),
                Trello.get(
                    '/cards/' + ctx.id + '/actions'
                ),
                ctx.id,
                t.get('board', 'shared', 'progressListName')
            ])
        })
        .spread(function (estemite, actions, cardID, plistname) {
            var res = calcWorkLog(plistname, actions);
            var total = 0;
            var isInProgress = false;
            var lastDate = 0;

            if (res) {
                total = res.total;
                isInProgress = res.tracked;
                lastDate = res.date;
            }

            var estemiteSuffix = "";

            if (estemite && estemite>0) {
                estemiteSuffix += ' / ' + moment
                    .duration(~~estemite, "hours")
                    .format('d [d] h [h] m [m]');
            }

            if (!isInProgress) {
                return function(){
                    var title = moment.duration(total, "milliseconds").format('d [d] h [h] m [m] s [s]');

                    if (estemiteSuffix.length > 0) {
                        title += estemiteSuffix
                    }

                    return title;
                }
            }

            lastDate = (new Date(lastDate)) - total;

            return function() {
                total = ((new Date()) - (new Date(lastDate)));

                var title = moment.duration(total, "milliseconds").format('d [d] h [h] m [m] s [s]');

                if (estemiteSuffix.length > 0) {
                    title += estemiteSuffix
                }

                return title
            }
        })
        .then(function (title) {
            return [{
                dynamic: function () {
                    return {
                        // title: 'Detail Badge', // for detail badges only
                        text: title(),
                        // icon: icon, // for card front badges only
                        // color: 'green',
                        refresh: 60
                    }
                }
            }]
        })
};

var authenticationSuccess = function (res) { console.log('Successful authentication', res, this); };
var authenticationFailure = function () { console.log('Failed authentication'); };

Trello.authorize({
    type: 'popup',
    name: 'Request access to TrelloAPI for TimeTracker',
    scope: {
        read: 'true',
        write: 'true'
    },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
});

var cardButtonCallback = function(t){
  return t.popup({
      title: 'Time estimate',
      url: './estimate.html',
      height: 200
    });
};

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
    },
    'card-buttons': function(t) {
        return [{
            text: 'Estimate',
            callback: cardButtonCallback
        }]
    },
    'authorization-status': (function (t) {
        return new TrelloPowerUp.Promise(function (resolve) {
            console.log('authorization-status')
            return resolve({ authorized: false });
        });
    }),
    'show-authorization': function(t) {
        return t.popup({
            title: 'My Auth Popup',
            url: 'authorize.html',
            height: 140,
        })
    }
})