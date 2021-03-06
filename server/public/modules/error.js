YUI().add('error', function(Y) {

    Y.one('#errorPanel').setStyle('display', 'block');
    var panel = new Y.Panel({
        srcNode      : '#errorPanel',
        width        : 400,
        zIndex       : 5,
        centered     : true,
        modal        : true,
        visible      : false,
        render       : true,
        plugins      : [Y.Plugin.Drag],
        hideOn: [
            {
                eventName: 'clickoutside'
            }
        ]
    });

    Y.one('#messagePanel').setStyle('display', 'block');
    var panel = new Y.Panel({
        srcNode      : '#messagePanel',
        width        : 400,
        zIndex       : 5,
        centered     : true,
        modal        : true,
        visible      : false,
        render       : true,
        plugins      : [Y.Plugin.Drag],
        hideOn: [
            {
                eventName: 'clickoutside'
            }
        ]
    });


    Y.Global.Hub.on('ui:error', function(obj) {
        panel.set('bodyContent', obj.message);
        panel.show();
    });

    Y.Global.Hub.on('ui:message', function(obj) {
        panel.set('bodyContent', obj.message);
        panel.show();
    });


}, '1.0', { requires: [ 'node', 'panel', 'dd-plugin' ] } );
