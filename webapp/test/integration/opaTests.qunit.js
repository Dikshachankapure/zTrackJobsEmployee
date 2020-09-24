/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"project/ZTrackJobsEmployee/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});