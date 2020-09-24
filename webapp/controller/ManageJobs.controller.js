sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/MessageStrip"
], function (Controller, MessageBox, History, JSONModel, Filter, MessageStrip) {
	"use strict";

	return Controller.extend("project.ZTrackJobsEmployee.controller.ManageJobs", {

		onInit: function () {
			var oModelJob = this.getOwnerComponent().getModel("JobSet");
			this.getView().setModel(oModelJob);
		},

		_getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		_onNavBack: function () {
			this._getRouter().navTo("Dashboard", {}, true);
		},
		
		_onPressMenu: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getSource().getText() === "Dashboard") {
				oRouter.navTo("Dashboard");
			} else if (oEvent.getSource().getText() === "Manage Jobs") {
				oRouter.navTo("ManageJobs");
			}
		},
		
		onSearch: function (oEvent) {
			var query = oEvent.getSource().getValue();
			if (query && query.length > 0) {
				var oFilter1 = new sap.ui.model.Filter("JobId", sap.ui.model.FilterOperator.Contains, query);
				var oFilter2 = new sap.ui.model.Filter("JobTitle", sap.ui.model.FilterOperator.Contains, query);
				var oFilter3 = new sap.ui.model.Filter("MachineId", sap.ui.model.FilterOperator.Contains, query);
				var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3], false);
			}
			
			var obinding = this.getView().byId("tblJobs").getBinding("items");
			obinding.filter(allFilter);
		},
		
		_onViewInfo: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var objJob = oEvent.getSource().getBindingContext().getObject();
			//Get the Model. 
			oRouter.navTo("ViewJob", {
				JobId: objJob.JobId
			});
		}

	});

});