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
		};

		function KeyHandler() {
			this.bind = function (elementName, $scope, fn, keycodes) {
				keycodes = keycodes.map(function (keycode) {
					return keymap[keycode] || keycode;
				});

				var keyHandler = function (event) {
					if (keycodes.indexOf(event.which) !== -1) {
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
