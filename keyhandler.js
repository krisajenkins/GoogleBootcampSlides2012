/*global angular: true, jQuery: true*/
"use strict";

angular.module('KeyHandlerModule', [])
	.factory('keyHandler', function () {
		var keymap = {
			"alt-gr":      18,
			"space":       32,
			"page-up":     33,
			"page-down":   34,
			"left-arrow":  37,
			"up-arrow":    38,
			"right-arrow": 39,
			"down-arrow":  40,
			"left-cmd":    91,
			"right-cmd":   93,
			"magic":      190,
		};

		function KeyHandler() {
			this.bind = function (elementName, $scope, keycode, fn) {
				keycode = keymap[keycode] || keycode;

				var keyHandler = function (event) {
					if (event.which === keycode) {
						fn.apply($scope);
						$scope.$apply();
					}
				};

				jQuery(elementName).bind('keyup', keyHandler);
				$scope.$on('$destroy', function () {
					jQuery(elementName).unbind('keyup', keyHandler);
				});
			};
		}

		return new KeyHandler();
	});
