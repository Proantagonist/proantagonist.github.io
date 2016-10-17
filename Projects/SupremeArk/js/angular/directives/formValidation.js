var formValidation = angular.module('formValidation', []);

formValidation.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            var checker = function () {
                var p1 = scope.$eval(attrs.ngModel);

                var p2 = scope.$eval(attrs.passwordMatch);

                return p1 == p2;
            };

            scope.$watch(checker, function (n) {
                control.$setValidity('unique', n)
            })
        }
    }
}]);

formValidation.directive('verifyInstitution', [function () { // Verfifies that the provided email belongs to a member institution
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function (scope, elem, attrs, control) {
            //array received contains user-provided email [string], selected organization name [string], and organizations object [object]
            var checker = function () {
                var ret = false;
                if (scope.$eval((attrs.verifyInstitution).split(',')[0]) && scope.$eval((attrs.verifyInstitution).split(',')[1])) {

                    var providedEmailDomain = scope.$eval((attrs.verifyInstitution).split(',')[0]).split('@')[1];
                    var institutionName = scope.$eval((attrs.verifyInstitution).split(',')[1]);
                    var organizationsObject = scope.$eval((attrs.verifyInstitution).split(',')[2].trim());

                    var matchedOrganization = findObjectByKey(organizationsObject, 'Name', institutionName);

                    if (matchedOrganization) {
                        if (matchedOrganization.Domain === providedEmailDomain) {
                            ret = true
                        }
                    }
                };
                return ret;

            }
            scope.$watch(checker, function (n) {
                control.$setValidity('field', n)
            })
        }
    }
}]);