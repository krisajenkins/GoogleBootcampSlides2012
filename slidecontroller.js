/*global angular: true, jQuery: true*/
"use strict";

angular.module('SlideshowModule', ['KeyHandlerModule', 'compile', 'ui'])
	.directive('revealAt', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				var level = parseInt(attr.revealAt, 10);

				scope.$watch("revealLevel", function (value) {
					element.css('visibility', (value >= level) ? 'visible' : 'hidden');
				});
			}
		};
	})
	.controller('SlidePageController', function ($scope, $routeParams, $http, $location, keyHandler, slideList) {
		// If the slide ID changes, normalize it and update the address bar.
		$scope.$watch('slideId', function (newSlideId) {
			newSlideId = Math.max(newSlideId, 0);
			newSlideId = Math.min(newSlideId, slideList.length - 1);
			$scope.slideId = newSlideId;

			$scope.nextSlide = function () {
				return slideList[$scope.slideId + 1];
			};

			$location.path("slide/" + slideList[newSlideId]);
		});

		$scope.slideId = slideList.indexOf($routeParams.slideName);
		$scope.revealLevel = 0;
		$scope.revealMax = 0;
		$scope.showRawSlide = false;

		// TODO: It would be nice to replace this with a resource call, as they're
		// neater, but that API seems to struggle with HTML ATM.
		$http({
			method: "GET",
			url: 'slides/' + $routeParams.slideName + ".html",
			params: {
				date: new Date(),
			}
		})
			.success(function (data) {
				$scope.content = data;
			});

		this.next = function () {
			if ($scope.revealLevel < $scope.revealMax) {
				$scope.revealLevel += 1;
			} else {
				$scope.slideId += 1;
			}
		};

		this.previous = function () {
			if ($scope.revealLevel > 0) {
				$scope.revealLevel -= 1;
			} else {
				$scope.slideId -= 1;
			}
		};

		this.toggleRawSlide = function () {
			$scope.showRawSlide = !$scope.showRawSlide;
			$scope.content = $scope.content + " ";
		};

		// Keyboard Bindings.
		keyHandler.bind('body', $scope, "left-arrow",  this.previous);
		keyHandler.bind('body', $scope, "right-arrow", this.next);
		keyHandler.bind('body', $scope, "page-up", this.previous);
		keyHandler.bind('body', $scope, "page-down", this.next);
		keyHandler.bind('body', $scope, "right-cmd", this.toggleRawSlide);
		keyHandler.bind('body', $scope, "magic", this.toggleRawSlide);
	});
