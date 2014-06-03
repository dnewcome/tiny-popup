YUI.add('tinypopup-smoke-tests',function(Y) {
   'use strict';
    Y.log('running tinypopup smoke tests');
    var suite = new Y.Test.Suite("Basic tinypopup test suite");
    suite.add(new Y.Test.Case({
        '#1 hello': function() {
            // Y.one('#test1').fire('click');
            Y.one('#test1').simulate('click');
            window.resizeTo(800, 600);
            // tp.show(400, 200);
            Y.Assert.isTrue(true);
    }}));
 Y.Test.Runner.add(suite);
}, '0.1', {requires:['test', 'node', 'node-event-simulate', 'event']});

