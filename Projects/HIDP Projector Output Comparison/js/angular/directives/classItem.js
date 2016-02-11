user.directive('classItem', function () {
    return {
        restrict: 'E',
        scope: {
            event: '='
        },
        link: function (scope, element, attrs) {
            
            if (scope.$parent.$last) {
                $('.loader').remove();
            }

            var selector;

            selector = angular.element(element.children()[0].children[0].children[0]);

            function classRegistrationUpdate() {
                var restPath = baseUrl + "Rest/UserServices/UpdateClasses/";
                var isClass = $(selector).prop('checked');
                var classGuid = element.parent().attr('guid');

                $.ajax({
                    url: restPath,
                    type: 'POST',
                    data: {
                        classGuid: classGuid,
                        isClass: isClass
                    },
                    success: function (data, textStatus, jqXHR) {
                        notification('Updated class registration.');
                    },
                    error: function (data, textStatus, jqXHR) {
                        notification('Error ' + data.status + ': ' + jqXHR )
                    }
                });
            }

            $(selector).on('click', classRegistrationUpdate);

        },
        templateUrl: location.protocol + '//' + location.hostname + baseUrl + '/js/angular/directives/classItem.html'
    };
});