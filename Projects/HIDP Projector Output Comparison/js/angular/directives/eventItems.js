app.directive('eventItem', function () {
    return {
        restrict: 'E',
        scope: {
            event: '='
        },
        link: function (scope, element, attrs) {

            var selectors = element.find('.event-name, .event-time');

            if (scope.$parent.$last) {
                $('.swapping-cards').height($('#default-content').height()); //Sets initial height of container when all events have been populated

                $(window).resize(function () {
                    $('.swapping-cards').height($('#default-content').height());
                });
                
                $('.loader').remove();
            }

            if (scope.event.UserRSVPed === "True") {
                element.children()[0].children[0].children[0].checked = true;
            }

            selectors.click(function () {
                $('html').append("<div id='info-modal' class='transparent'></div>").addClass('modal-open').delay(20).queue(function () {
                    $('#info-modal').addClass('slide-in');
                    $(this).dequeue();
                    loadContent();
                });

                function loadContent() {
                    $('#info-modal').append('<div class="modal-container details-card"></div>');

                    //BEGIN EVENT INFO CONTENT

                    var RSVP1, RSVP2, RSVPStatus1, RSVPStatus2;
                    var eventInfo = "";

                    if (scope.event.RequiresRSVP == 'True') {
                        RSVP1 = ", RSVP Required";
                        RSVP2 = "This is a limited-seating event. You must reserve a seat by adding this event to your sessions.";
                    } else {
                        RSVP1 = "";
                        RSVP2 = "This is an open attendance event, no reservation is required to attend.";
                    }

                    if (scope.event.UserRSVPed == 'True') {
                        RSVPStatus1 = 'Added to your Sessions';
                        RSVPStatus2 = 'check';
                    } else {
                        RSVPStatus1 = 'Add to My Sessions';
                        RSVPStatus2 = 'event-add';
                    }

                    eventInfo += "<div class='card no-pad'>";


                    eventInfo += "<div id='default'>";
                    eventInfo += "<div title='Close' id='modal-close-button-container' class='contained'><span id='modal-close-button' class='white'></span></div>";
                    eventInfo += "<div id='event-image'><img src='../img/graphics/graphic-card-event-default-image.svg' alt='Placeholder'/><div class='fab action inner' id='regButton' alt='" + RSVPStatus1 + "' title='" + RSVPStatus1 + "' event='" + scope.event.Guid + "'><span id='" + RSVPStatus2 + "'></span></div></div>";
                    eventInfo += "<div id='event-description' class='text-block'>";
                    eventInfo += "<h2>" + scope.event.Title + "</h2>";
                    eventInfo += "<span id='tags'>" + scope.event.Time + " - " + scope.event.TimeEnd + ", " + scope.event.LocationBuilding + " " + scope.event.LocationRoom + RSVP1 + " </span>";
                    eventInfo += "<p>" + scope.event.Abstract + "</p>";

                    //If Speakers
                    if (scope.event.SpeakerModules) {
                        eventInfo += "<h2>Speakers</h2>";

                        $(scope.event.SpeakerModules).each(function (key, item) {

                            var imgString = "";

                            var imgHeaderRequestUrl = baseUrl + "img/presenters/" + item.SpeakerLastName.replace(/[^-a-zA-Z ]+/ig, '') + ".jpg";

                            $.ajax({
                                url: imgHeaderRequestUrl,
                                async: false,
                                type: 'HEAD',
                                error: function () {
                                    imgString = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px"><circle cx="25" cy="25" r="26" style="fill:#90CAF9; font-size:1rem"/><text x="25" y="28" style="fill: #f5f5f5; text-anchor:middle; alignment-baseline:middle; font-size:28px; font-family: Roboto, Helvetica Neue, Arial; font-weight: 300;">' + item.SpeakerFirstName[0] + item.SpeakerLastName[0] + '</text></svg>';
                                },
                                success: function () {
                                    imgString = imgHeaderRequestUrl;
                                }
                            });

                            eventInfo += "<div class='presenter-list-item'><img src='" + imgString + "'/><div class='presenter-list-details'><p>" + item.SpeakerFirstName + " " + item.SpeakerLastName + "</p><p>" + item.SpeakerOrganization + "</p></div></div>";

                        });
                    }

                    //If Sessions
                    if (scope.event.SessionModules) {
                        eventInfo += "<h2>Talks</h2>";
                        $(scope.event.SessionModules).each(function (key, item) {

                            var sessionName = item.SessionName;
                            $(scope.event.SessionModules[key].SpeakerModules[0]).each(function (key2, item2) {

                                var imgString = "";

                                var imgHeaderRequestUrl = baseUrl + "img/presenters/" + item2.SpeakerLastName.replace(/[^a-zA-Z ]+/ig, '') + ".jpg";

                                $.ajax({
                                    url: imgHeaderRequestUrl,
                                    async: false,
                                    type: 'HEAD',
                                    error: function () {
                                        imgString = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px"><circle cx="25" cy="25" r="26" style="fill:#90CAF9"/><text x="25" y="28" style="fill: #f5f5f5; text-anchor:middle; alignment-baseline:middle; font-size:28px; font-family: Roboto, Helvetica Neue, Arial; font-weight: 300;">' + item2.SpeakerFirstName[0] + item2.SpeakerLastName[0] + '</text></svg>';
                                    },
                                    success: function () {
                                        imgString = imgHeaderRequestUrl;
                                    }
                                });

                                eventInfo += "<div class='presenter-list-item'><img src='" + imgString + "'/><div class='presenter-list-details'><p>" + item2.SpeakerFirstName + " " + item2.SpeakerLastName + "</p><p>" + item2.SpeakerOrganization + "</p><p>" + item.SessionName + "</p></div></div > ";
                            })
                        });
                    }

                    eventInfo += "<div class='border-divider'></div>"
                    eventInfo += "<h3>Registration Information</h3>";
                    eventInfo += "<p>" + RSVP2 + "</p>"
                    eventInfo += "<p>Seat capacity: " + scope.event.Capacity + "</p>";
                    eventInfo += "<p>Seats remaining: " + scope.event.RemainingCapacity + "</p>";
                    eventInfo += "</div>";


                    eventInfo += "</div>"; //end of event-description



                    eventInfo += "<div id='qr' class='content-block all'>"; //QR
                    eventInfo += "<div title='Back' id='modal-back-button-container' class='contained'><span id='modal-back-button'></span></div>";
                    eventInfo += "<div class='content-block'>"
                    eventInfo += "<p>Scan this QR Code with any capable device to check in.</p>";
                    //            eventInfo += "<div class='border-divider'></div>";
                    eventInfo += "<img src='" + location.protocol + '//' + location.hostname + baseUrl + "QR/" + scope.event.Guid + ".png'/>";
                    eventInfo += "</div>";
                    eventInfo += "</div>"; //END QR


                    eventInfo += "<div id='survey' class='content-block all'>"; //Survey
                    eventInfo += "<p>Session rating form goes here</p>";
                    eventInfo += "</div>"; //END Survey

                    // No time to implement session rating system
                    //                    eventInfo += "<div id='event-actions'><div><p class='md-link maroon disabled' onclick='swapCardContent(survey, this)'>RATE THIS SESSION</p></div><div><p class='md-link maroon' onclick = 'swapCardContent(qr, this)'>QR</p><p id='checkin-btn' class='md-link maroon disabled'>CHECKIN</p><a href='" + scope.event.LocationLink + "' target='_blank' class='md-link maroon'>LOCATE</a></div></div>";
                    if (userGuid !== undefined) {
                        eventInfo += "<div id='event-actions'><div><p class='md-link maroon' onclick = 'swapCardContent(qr, this)'>QR</p><p id='checkin-btn' class='md-link maroon'>CHECKIN</p><a href='" + scope.event.LocationLink + "' target='_blank' class='md-link maroon'>LOCATE</a></div></div>";
                    } else {
                        eventInfo += "<div id='event-actions'><div><p class='md-link maroon' onclick = 'swapCardContent(qr, this)'>QR</p><p id='checkin-btn' class='md-link maroon disabled'>CHECKIN</p><a href='" + scope.event.LocationLink + "' target='_blank' class='md-link maroon'>LOCATE</a></div></div>";
                    }

                    eventInfo += "</div>";

                    $('.modal-container').append(eventInfo);

                    $('#regButton').click(function () {
                        if (userGuid !== undefined) {
                            if (scope.event.UserRSVPed === "False") {
                                registerEvent(scope.event.Guid);
                                //                                $(this).children(0).attr("id", "check");
                                $(this).children(0).addClass('scale-out').on('transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd', function () {
                                    $(this).attr("id", "check");
                                    $(this).removeClass('scale-out');
                                });

                                $('#default-content').find('div.row event-item[data="' + $(this).attr('event') + '"] input').prop('checked', true);
                            } else {
                                unregisterEvent(scope.event.Guid);
                                //                                $(this).children(0).attr("id", "event-add");
                                $(this).children(0).addClass('scale-out').on('transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd', function () {
                                    $(this).attr("id", "event-add");
                                    $(this).removeClass('scale-out');
                                });

                                $('#default-content').find('div.row event-item[data="' + $(this).attr('event') + '"] input').prop('checked', false);
                            }
                        } else {
                            notification('Please log in to RSVP sessions.', 'LOGIN', baseUrl + 'Login/?ret=' + window.location.href);
                        }
                    });

                    $('#checkin-btn').click(function () {
                        if (!$(this).hasClass('disabled')) {
                            var eventGuid = $("#regButton").attr('event');
                            eventCheckIn(eventGuid);
                        }
                    });

                    //END EVENT INFO CONTENT

                    modalCommonInteractions();
                }
            });

            $(element).find('input').click(function () {
                if (userGuid !== undefined) {

                    if (scope.event.UserRSVPed === "False") {
                        registerEvent(scope.event.Guid);
                    } else {
                        unregisterEvent(scope.event.Guid);
                    }

                } else {
                    notification('Please log in to RSVP sessions.', 'LOGIN', baseUrl + 'Login/?ret=' + window.location.href);
                }
            });

            function registerEvent(eventGuid) {
                var restPath = baseUrl + "Rest/UserServices/RSVPs/Push/";
                var eventGuid = eventGuid;

                $.ajax({
                    url: restPath,
                    async: false,
                    type: 'POST',
                    data: {
                        EventGuid: eventGuid
                    },
                    success: function (data, textStatus, jqXHR) {
                        scope.event.UserRSVPed = "True";
                        notification('Successfully registered for event.');
                        return true;
                    },
                    error: function (data, textStatus, jqXHR) {
                        notification('Error ' + data.status + ': ' + jqXHR)
                    }
                });
            }

            function unregisterEvent(eventGuid) {
                var restPath = baseUrl + "Rest/RSVPs/Delete/";
                var eventGuid = eventGuid;

                $.ajax({
                    url: restPath,
                    async: false,
                    type: 'POST',
                    data: {
                        EventGuid: eventGuid,
                        userGuid: userGuid
                    },
                    success: function (data, textStatus, jqXHR) {
                        scope.event.UserRSVPed = "False";
                        notification('Successfully unregistered for event.');
                        return true;
                    },
                    error: function (data, textStatus, jqXHR) {
                        notification('Error ' + data.status + ': ' + jqXHR)
                    }
                });
            }

        },
        templateUrl: location.protocol + '//' + location.hostname + baseUrl + '/js/angular/directives/eventItems.html'
    };
});