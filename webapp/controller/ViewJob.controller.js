sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/Device"
], function (Controller, MessageBox, History, JSONModel, MessageToast, Device) {
	"use strict";

	return Controller.extend("project.ZTrackJobsEmployee.controller.ViewJob", {

	
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("ViewJob").attachPatternMatched(this._onViewJobMatched, this);
		},
		
		_getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		_onNavBack: function () {
			this._getRouter().navTo("ManageJobs", {}, true);
		},
		
		_onPressMenu: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oEvent.getSource().getText() === "Dashboard") {
				oRouter.navTo("Dashboard");
			} else if (oEvent.getSource().getText() === "Manage Jobs") {
				oRouter.navTo("ManageJobs");
			}
		},
		
		_onViewJobMatched: function (oEvent) {

			var that = this;

			var oParameters = oEvent.getParameters();
			var oModelJob = this.getOwnerComponent().getModel("JobSet");
			this.getView().setModel(oModelJob);
			var oModel = this.getView().getModel();

			var txtJobId = this.getView().byId("txtJobId");
			var txtJobTitle = this.getView().byId("txtJobTitle");
			var txtCompanyName = this.getView().byId("txtCompanyName");
			var txtPlantName = this.getView().byId("txtPlantName");
			var txtStorageLocationName = this.getView().byId("txtStorageLocationName");
			var txtMachineId = this.getView().byId("txtMachineId");
			var txtMachineName = this.getView().byId("txtMachineName");
			var txtJobInstructions = this.getView().byId("txtJobInstructions");
			var txtAssignedDate = this.getView().byId("txtAssignedDate");
			var txtFromTime = this.getView().byId("txtFromTime");
			var txtToTime = this.getView().byId("txtToTime");
			var txtStatus = this.getView().byId("txtStatus");
			
			var btnStartJob = this.getView().byId("btnStartJob");
			var btnEndJob = this.getView().byId("btnEndJob");
		

			if (oParameters.arguments.JobId !== "" || oParameters.arguments.JobId !== null) {
				this.JobId = oParameters.arguments.JobId;
				for (var i = 0; i < oModel.getData().Jobs.length; i++) {
					if (oModel.getData().Jobs[i].JobId.toString() === this.JobId) {
						txtJobId.setText(this.JobId);
						txtJobTitle.setText(oModel.getData().Jobs[i].JobTitle);
						txtCompanyName.setText(oModel.getData().Jobs[i].CompanyName);
						txtPlantName.setText(oModel.getData().Jobs[i].PlantName);
						txtStorageLocationName.setText(oModel.getData().Jobs[i].SLocName);
						txtMachineId.setText(oModel.getData().Jobs[i].MachineId);
						txtMachineName.setText(oModel.getData().Jobs[i].MachineName);
						txtJobInstructions.setText(oModel.getData().Jobs[i].JobInstructions);
						txtAssignedDate.setText(oModel.getData().Jobs[i].AssignedDate);
						txtFromTime.setText(oModel.getData().Jobs[i].FromTime);
						txtToTime.setText(oModel.getData().Jobs[i].ToTime);
						txtStatus.setText(oModel.getData().Jobs[i].Status);
						txtStatus.setType(oModel.getData().Jobs[i].Type);

						if (oModel.getData().Jobs[i].Status === "COMPLETED" || oModel.getData().Jobs[i].Status === "CANCELLED") {
							btnStartJob.setVisible(false);
							btnEndJob.setVisible(false);
						
						} else if (oModel.getData().Jobs[i].Status === "ONGOING") {
							btnStartJob.setVisible(false);
							btnEndJob.setVisible(true);
							
						} else if (oModel.getData().Jobs[i].Status === "UPCOMING") {
							btnStartJob.setVisible(true);
							btnEndJob.setVisible(false);
						
						}
						that.setMapData();
						return false;
					}
				}

			} else {
				MessageBox.error("Incorrect Data");
			}
		},

	});

});