'use strict';

const RoutePatient = require('./../routes/routePatient');
const RouteDoctr = require('./../routes/routeDoctor');

module.exports = (app) => {
    RouteDoctr(app);
};

module.exports = (app) => {
    RoutePatient(app);
};