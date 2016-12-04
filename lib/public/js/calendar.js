      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '836493568526-f03h1n9dkk6gdedgasua5nh674blib04.apps.googleusercontent.com';
      var eventsObj = [];
      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
      var currentEvent = {
        "etag" : "-1"
      };
      var eventImgs = {
        "Fridge" : {
          "overlay" : "Fridge2.png",
          "screen" : "NF_Fridge.png"
        },
        "Phone" : {
          "overlay" : "Phone.png",
          "screen" : "Phone_Icon.png"
        },
        "Music" : {
          "overlay" : "Music.png",
          "screen" : "Music_Icon.png"
        },
        "Bathroom" : {
          "overlay" : "Bath.png",
          "screen" : "Bath_Outline.png"
        },
        "Wardrobe" : {
          "overlay" : "Bed.png",
          "screen" : "Bed.png"
        },
        "Bed" : {
          "overlay" : "Wardrobe_Icon.png",
          "screen" : "Wardrobe.png"
        }
      };
      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 1,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
          renderReminders(events);
        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        //console.log(message);
        //eventsObj[eventsObj.length] = message;
        //console.log(eventsObj);
      }



      function renderReminders(events) {
        // Iterate the list of events
        // Use current time to calculate the next and last reminders
        //console.log(events);
        var now = new Date(); // for now
        var eventDate = new Date(); // for now
        for(var i = 0; i < events.length; ++i)
        {
          // if(events[i].start.dateTime)
          eventDate = (new Date(events[i].start.dateTime));

          if((eventDate > now) &&  (events[i].etag != currentEvent.etag))
          {
            console.log(events[i]);
            console.log(currentEvent);
             // If this is the next reminder -
            // console.log("Comparison success");
            //$('#next_time').text(eventDate.getHours() + ':' + checkTime(eventDate.getMinutes()));
            currentEvent = events[i];
            showEvent(events[i]);
            break;
          }
        }
      }



      function showEvent(event) {
        //console.log(event);
        openNav();
        var eventDesc = event.summary;
        var eventDate = (new Date(event.start.dateTime));
        //eventDesc = eventDesc.replace(/\s+/g, '');
        //console.log(eventDesc);
        var eventDetails = eventDesc.split('-');
        //console.log(eventDetails);
        // Stage One - Change Next, to Last reminder
        // Swaps Text & Img
        $('#last_time').text($('#next_time').text());
        $('#last_img').attr('src', $('#next_img').attr('src'));
        // Update Next with the latest event
        // Set new screen image
        $('#next_img').attr('src', '/img/' + eventImgs[eventDetails[0]].screen);
        // Set new screen time
        $('#next_time').text(eventDate.getHours() + ':' + checkTime(eventDate.getMinutes()));
        // Set new overlay divs
        $('#overlay_title').text(eventDetails[0]);
        $('#overlay_img').attr('src', '/img/' + eventImgs[eventDetails[0]].overlay);
        $('#overlay_desc').text(eventDetails[1]);
      }
