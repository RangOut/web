(function () {
    'use strict';

    var rangoutDialog = angular.module('rangoutDialog', []);

    rangoutDialog.service('DialogService', function ($mdDialog) {
        var self = this;

        self.customDialog = function (controller, templateUrl, event, locals) {
            return $mdDialog.show({
                controller: controller,
                templateUrl: templateUrl,
                locals: locals,
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: false
            });
        };

        self.confirmDialog = function (title, text, event, confirmText, cancelText) {
            var confirm = $mdDialog.confirm({
                title: title,
                textContent: text,
                ariaLabel: text,
                targetEvent: event,
                clickOutsideToClose: true,
                ok: confirmText,
                cancel: cancelText
            });

            return $mdDialog.show(confirm);
        };
    });
})();
