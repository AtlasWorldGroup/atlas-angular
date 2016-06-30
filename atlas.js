(function () {
  'use strict';
  angular
    .module('atlas.angular', [])

  angular
    .module('atlas.angular.filters', [])
    .directive('dateFilter', dateFilter)

  // https://gist.github.com/rhutchison/c8c14946e88a1c8f9216
  angular
    .module('atlas.angular.showErrors', [])
    .directive('showErrors', showErrors)

  angular
    .module('atlas.angular.navbar', [])
    .controller('AtlasNavController', AtlasNavController)
    .directive('atlasNav', atlasNav)
    .directive('atlasCommandLeft', atlasCommandLeft)
    .directive('atlasCommandCenter', atlasCommandCenter)
    .directive('atlasCommandRight', atlasCommandRight)
    .directive('atlasCommand', atlasCommand)

  function dateFilter(filter) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$parsers.push(function (viewValue) {
          return filter(viewValue, 'MM/dd/yyyy');
        });
      }
    };
  }

  showErrors.$inject = ['$timeout', '$interpolate'];
  function showErrors($timeout, $interpolate) {
    var directive = {
      restrict: 'A',
      require: '^form',
      compile: compile
    };

    return directive;

    function compile(elem, attrs) {
      if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
        if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
          throw new Error('show-errors element does not have the \'form-group\' or \'input-group\' class');
        }
      }

      return linkFn;

      function linkFn(scope, el, attrs, formCtrl) {
        var inputEl,
          inputName,
          inputNgEl,
          options,
          showSuccess,
          initCheck = false,
          showValidationMessages = false;

        options = scope.$eval(attrs.showErrors) || {};
        showSuccess = options.showSuccess || false;
        inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
        inputNgEl = angular.element(inputEl);
        inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

        if (!inputName) {
          throw new Error('show-errors element has no child input elements with a \'name\' attribute class');
        }

        scope.$watch(function () {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, toggleClasses);

        scope.$on('show-errors-check-validity', checkValidity);
        scope.$on('show-errors-reset', reset);

        function checkValidity(event, name) {
          if (angular.isUndefined(name) || formCtrl.$name === name) {
            initCheck = true;
            showValidationMessages = true;

            return toggleClasses(formCtrl[inputName].$invalid);
          }
        }

        function reset(event, name) {
          if (angular.isUndefined(name) || formCtrl.$name === name) {
            return $timeout(function () {
              el.removeClass('has-error');
              el.removeClass('has-success');
              showValidationMessages = false;
            }, 0, false);
          }
        }

        function toggleClasses(invalid) {
          el.toggleClass('has-error', showValidationMessages && invalid);

          if (showSuccess) {
            return el.toggleClass('has-success', showValidationMessages && !invalid);
          }
        }
      }
    }
  }

  function atlasNav() {
    return {
      restrict: 'E',
      templateUrl: 'template/navigation/navbar.html',
      transclude: true,
      scope: {
        username: '=username',
        showCommand: '@showCommand',
        logoUrl: '=logoUrl'
      },
      link: function ($scope, elem, attrs) {
        if (!$scope.username) {
          $scope.username = attrs.username;
        }
        if (!$scope.logoUrl) {
          $scope.logoUrl = attrs.logoUrl;
        }
      },
      controller: 'AtlasNavController'
    };
  }

  function atlasCommandLeft() {
    return {
      restrict: 'E',
      templateUrl: 'template/navigation/command-left.html',
      transclude: true
    };
  }

  function atlasCommandCenter() {
    return {
      restrict: 'E',
      templateUrl: 'template/navigation/command-center.html',
      transclude: true
    };
  }

  function atlasCommandRight() {
    return {
      restrict: 'E',
      templateUrl: 'template/navigation/command-right.html',
      transclude: true
    };
  }

  function atlasCommand() {
    return {
      restrict: 'E',
      templateUrl: 'template/navigation/command.html',
      scope: {
        title: '=title',
        text: '=text',
        icon: '@icon',
        clickEvent: '&clickEvent'
      },
      link: function ($scope, elem, attrs) {
        if (!$scope.text) {
          $scope.text = attrs.text;
        }
        $scope.icon = attrs.icon;
      }
    };
  }

  AtlasNavController.$inject = ['$scope', '$rootScope'];
  function AtlasNavController($scope, $rootScope) {
    var isShown = $scope.showCommand === 'true'
    if (isShown) {
      $rootScope.bodyCss = 'body-regular';
    }
    else {
      $rootScope.bodyCss = 'body-short';
    }
    $scope.isMainCollapsed = true;
    $scope.isCommandCollapsed = true;
  }


})();