// $ = jQuery = require('jquery'); //need to be global because bootstrap wants it to be there
// var React = require('react');
// var Home = require('./components/homePage');
// var About = require('./components/about/aboutPage');
// var Header = require('./components/common/header');
// var Authors = require('./components/authors/authorPage');
"use strict";
//                             MAIN >> ROUTES >> APP
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, function (Handler) { //Router.HistoryLocation,
    React.render(<Handler />, document.getElementById('app'));
});

/*(function (win) {
    "use strict";

    var App = React.createClass({
        render: function () {
            var Child;
            switch (this.props.route) {
                case 'about': Child = About; break;
                case 'authors': Child = Authors; break;
                default: Child = Home;
            }
            return (
                <div>
                    <Header/>
                    <Child/>
                </div>
            );
        }
    });

    function render() {
        var route = win.location.hash.substr(1);
        React.render(<App route={route} />, document.getElementById('app'));
    }

    win.addEventListener('hashchange', render);
    render();
})(window);*/