var PanelController = (function () {
    function PanelController() {
    }
    PanelController.prototype.toggleSearch = function () {
        this.showSearch = !this.showSearch;
    };
    PanelController.prototype.goToProfile = function (href) {
        console.log('party');
    };
    PanelController.prototype.joinUnit = function (selected) {
        console.log('party');
    };
    PanelController.$inject = ['PersonFactory', 'persons', 'person', '$location'];
    return PanelController;
})();
//# sourceMappingURL=panelCtrl.controller.js.map