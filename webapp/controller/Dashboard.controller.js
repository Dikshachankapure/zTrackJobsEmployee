sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("project.ZTrackJobsEmployee.controller.Dashboard", {
		onInit: function () {
			var that = this;
			that._loadDashboard();
		},

		_onPressMenu: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getSource().getText() === "Dashboard") {
				oRouter.navTo("Dashboard");
			} else if (oEvent.getSource().getText() === "Manage Jobs") {
				oRouter.navTo("ManageJobs");
			}
		},

		_onEditJob: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var objJob = oEvent.getSource().getBindingContext().getObject();

			oRouter.navTo("EditJob", {
				JobId: objJob.JobId
			});

		},

		_loadDashboard: function (oEvent) {
			var oModelJob = this.getOwnerComponent().getModel("JobSet");
			this.getView().setModel(oModelJob);

			var Status1 = "UPCOMING";
			var Status2 = "COMPLETED";

			if (Status1 && Status1.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, Status1);
				var obinding1 = this.getView().byId("tblUpcomingJobs").getBinding("items");
				obinding1.filter(oFilter1);
			}

			if (Status2 && Status2.length > 0) {
				var oFilter2 = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, Status2);
				var obinding2 = this.getView().byId("tblCompletedJobs").getBinding("items");
				obinding2.filter(oFilter2);
			}
		},

		_onPressTiles: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getSource().getHeader() === "Machines") {
				oRouter.navTo("ManageMachine");
			} else if (oEvent.getSource().getHeader() === "Jobs") {
				oRouter.navTo("ManageJobs");
			}
		},

	});
});