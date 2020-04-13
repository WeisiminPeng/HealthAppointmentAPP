'use strict';

const RoutePatient = require('./../routes/routePatient');
const RouteDoctor = require('./../routes/routeDoctor');
const RouteAppointment = require('./../routes/routeAppointment');

// module.exports = (app) => {
//     RouteDoctor(app);
// };

module.exports = (app) => {
    RoutePatient(app);
    RouteDoctor(app);
    RouteAppointment(app);
};