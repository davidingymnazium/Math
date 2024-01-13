let parameters1 = {
  width: 500,
  height: 600,
  showToolBar: true,
  customToolBar: "0 || 1",
  borderColor: null,
  showMenuBar: false,
  showAlgebraInput: false,
  showResetIcon: true,
  enableLabelDrags: true,
  enableShiftDragZoom: true,
  enableRightClick: false,
  capturingThreshold: null,
  showToolBarHelp: false,
  errorDialogsActive: true,
  useBrowserForJS: true,
};

var applet1 = new GGBApplet("5.0", parameters1);



//------------------------

let parameters2 = {
  width: 500,
  height: 600,
  showToolBar: true,
  customToolBar: "0 || 1",
  borderColor: null,
  showMenuBar: false,
  showAlgebraInput: false,
  showResetIcon: true,
  enableLabelDrags: true,
  enableShiftDragZoom: true,
  enableRightClick: false,
  capturingThreshold: null,
  showToolBarHelp: false,
  errorDialogsActive: true,
  useBrowserForJS: true,
};

var applet2 = new GGBApplet("5.0", parameters2);


parameters1.appletOnLoad = function (api) {
  api.setGridVisible(true);
  console.log(api.getGraphicsOptions(1));
  api.setGraphicsOptions({
    grid: true,
    gridType: 2,
  });
  api.setAngleUnit("deg");
  
};

parameters2.appletOnLoad = function (api) {
  api.setGridVisible(true);
  api.setGraphicsOptions({
    grid: true,
    gridType: 3,
  });

  console.log(api);
};


window.addEventListener("load", function () {
  applet1.inject("applet1");
});

window.addEventListener("load", () => {
  applet2.inject("applet2");
})