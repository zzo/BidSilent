var parser = require('blindparser')
    , eventHub = require('EventHub/clients/server/eventClient.js').getClientHub('http://localhost:5883?token=ehrox')
    , feed = 'http://www.amazon.com/gp/rss/bestsellers/electronics/ref=zg_bs_electronics_rsslink'
    , OperationHelper = require('apac').OperationHelper
    , opHelper = new OperationHelper({
        awsId:     ''
        , awsSecret: ''
        , assocId:   ''
    })
    ;

module.exports = {
    create: function(hub) {
        hub.on('product:get', function(obj, callback) {
            parser.parseURL(feed, {}, function(err, out) {
                if (err) {
                    callback(err);
                } else if (out.items.length) {
                    callback(null, out.items);
                } else {
                    callback('Cannot get item list');
                }
            });
        });

        hub.on('amazon:getASIN', function(obj, callback) {
            opHelper.execute('ItemLookup', {
                'ItemId': obj.asin
                , 'ResponseGroup': 'Large'
            }, callback);
        }, {type: 'unicast'});
    }
};

// get ref to hub & then load server-side modules
eventHub.on('eventHubReady', function() {
    module.exports.create(eventHub);
});


