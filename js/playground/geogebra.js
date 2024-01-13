let parameters = {
  width: 700,
  height: 600,
  showToolBar: false,
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
  useBrowserForJS: false,
};

var applet = new GGBApplet("5.0", parameters);

parameters.appletOnLoad = function (api) {
  api.setGridVisible(true);

  api.setGraphicsOptions({
    grid: true,
    gridType: 3,
  });
};

window.addEventListener("load", function () {
  applet.inject("applet1");
});
