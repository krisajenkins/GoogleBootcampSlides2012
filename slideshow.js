/*global angular: true, jQuery: true*/
"use strict";

angular.module('Bootcamp', ['SlideshowModule', 'ui'])
	.value('ui.config', {codemirror: {theme: 'eclipse', tabSize: '2'}})
	.config(function ($routeProvider) {
		$routeProvider
			.when('/slide/:slideName', {
				templateUrl: 'templates/slide_page.html',
				controller: 'SlidePageController',
				resolve: {
					slideList: function () {
						return [
							// Intro.
							'start',
							'day_format',
							'about_me',
							'about_you',
							'history',

							// Angular.
							'angular_intro',
							'what_is_angular_quote',
							'what_is_angular_features_1',
							'what_is_angular_features_2',

							// Angular: Writing.
							'hello_world',
							'binding_demo',
							'binding_what',
							'binding_demo_2',
							'hello_world_2',

							'mvc',
							'jquery',
							'controllers_and_scopes',
							'scope',
							'scope_nesting',

							'iteration',
							'filters_for_filtering',
							'filters_for_formatting',

							'filters_builtin',
							'filters_syntax',
							'the_filter_called_filter',
							'filter_predicates',

							'forms_demo',
							'forms_classes',
							'utility_attributes_1',
							'utility_attributes_2',
							'writing_recap',
							'questions_1',

							// Hack 1.
							'okay_go_1',
						];
					}
				},
			})
			.otherwise({redirectTo: '/slide/start'});
	});
