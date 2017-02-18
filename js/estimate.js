var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe();

var cardEstimate = document.getElementById('CardTimeEstemite');
var key;

t.render(function () {
    return t.card('id')
        .then(function(ctx) {
            key = 'card-'+ctx.id+'-estemite';
            return t.get('board', 'shared', key)            
        })
        .then(function (estimate) {
            if (estimate > 0) {
                cardEstimate.value = estimate;
            }
        })
        .then(function () {
            t.sizeTo('#content').done();
        })
});

document.getElementById('CardTimeEstemiteBtnSave').addEventListener('click', function () {
    return t.set('board', 'shared', key, cardEstimate.value)
        .then(function () {
            t.closePopup();
        })
})
