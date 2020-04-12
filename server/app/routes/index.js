'use strict';

const RoutePatient = require('./../routes/routePatient');
const RouteDoctor = require('./../routes/routeDoctor');

// module.exports = (app) => {
//     RouteDoctor(app);
// };

module.exports = (app) => {
    RoutePatient(app);
    RouteDoctor(app);
};