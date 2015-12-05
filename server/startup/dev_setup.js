Meteor.startup(function () {
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
        var theme1, theme2, theme3, theme4, theme5;
        if (themes.find().count() == 0) {
            theme1 = themes.insert({
                "name": "Financial"
            });
            theme2 = themes.insert({
                "name": "Health"
            });
            theme3 = themes.insert({
                "name": "Retirement"
            });
            theme4 = themes.insert({
                "name": "Senior Living"
            });
            theme5 = themes.insert({
                "name": "Community"
            });
        }
        if (phonetypes.find().count() == 0) {
            phonetypes.insert({type: "Home"});
            phonetypes.insert({type: "Cell"});
            phonetypes.insert({type: "Work"});
            phonetypes.insert({type: "Other"});
        }
        var vendor1, vendor2;
        var venue1, venue2;
        if (vendors.find().count() == 0) {
            vendor1 = vendors.insert({
                "name": "John's Food Service",
                "contactPerson": "John Smith",
                "contactNumber": "416-967-1111",
                "contactEmail": "john@johnsfoodservice.ca",
                "address": {
                    "line1": "111 Yonge St.",
                    "line2": "Apt. 2511",
                    "line3": "",
                    "city": "Toronto",
                    "provinceState": "Ontario",
                    "country": "Canada",
                    "postalZipCode": "M2M 3L7"
                }
            });
            vendor2 = vendors.insert({
                "name": "Staples Canada",
                "contactPerson": "Liz Doe",
                "contactNumber": "416-555-1234",
                "contactEmail": "liz.doe@staples.ca",
                "address": {
                    "line1": "2500 Hurontario St.",
                    "line2": "Unit 14",
                    "line3": "",
                    "city": "Mississauga",
                    "provinceState": "Ontario",
                    "country": "Canada",
                    "postalZipCode": "L2M 3L7"
                }
            });
        }
        if (venues.find().count() == 0) {
            venue1 = venues.insert({
                "name": "Radisson Hotel Toronto East",
                "description": "Nice venue in Toronto",
                "hasParkingAvailability": "true",
                "hasPublicTransportationAccess": "true",
                "address": {
                    "line1": "55 Hallcrown Place",
                    "line2": "",
                    "line3": "",
                    "city": "Toronto",
                    "provinceState": "Ontario",
                    "country": "Canada",
                    "postalZipCode": "M2J 4R1"
                }
            });
            venue2 = venues.insert({
                "name": "Holiday Inn Toronto East",
                "description": "Nice venue in Toronto",
                "hasParkingAvailability": "true",
                "hasPublicTransportationAccess": "true",
                "address": {
                    "line1": "50 Estate Dr.",
                    "line2": "",
                    "line3": "",
                    "city": "Scarborough",
                    "provinceState": "Ontario",
                    "country": "Canada",
                    "postalZipCode": "M1H 2Z1"
                }
            });
            venue3 = venues.insert({
                "name": "Sheridan College - Trafalgar",
                "description": "Large conference room and theater room available.",
                "hasParkingAvailability": "true",
                "hasPublicTransportationAccess": "true",
                "address": {
                    "line1": "1430 Trafalgar Rd",
                    "line2": "",
                    "line3": "",
                    "city": "Oakville",
                    "provinceState": "Ontario",
                    "country": "Canada",
                    "postalZipCode": "L6H 2L1"
                }
            });
        }
        if (events.find().count() == 0) {
            var event = events.insert({
                "owner": "Brandon White",
                "name": "Retirees and Healthy Living",
                "description": "Showing members how to live healthy",
                "totalBudget": "2500.00",
                "theme": theme2,
                "status": "Complete",
                "dateTime": "2015-12-25T18:00:00",
                "venue": venue1
            });
            tasks.insert({
                "name": "Hire Caterer",
                "description": "Hire a caterer for 50-75 people",
                "notes": "In talks with caterer, waiting on an estimate",
                "userIdAssignedTo": "1",
                "dateTime": "2015-12-20T16:00:00",
                "taskType": "Vendor",
                "vendor": vendor1,
                "budget": "350.00",
                "status": "Complete",
                "event": event
            });
            tasks.insert({
                "name": "Book Venue for Event",
                "description": "Approximately 100 guests are attending, please book a hall to accommodate this in the Oakville area.",
                "notes": "Take a look at the venue we used last time",
                "userIdAssignedTo": "1",
                "dateTime": "2015-12-21T16:00:00",
                "taskType": "Custom",
                "vendor": "",
                "budget": "1000.00",
                "status": "Complete",
                "event": event
            });
            tasks.insert({
                "name": "Hire a Guest Speaker",
                "description": "A Subject Matter Expert (SME) is required in the field of financial planning.",
                "notes": "Do a Google search to see if we can find anyone nearby",
                "userIdAssignedTo": "1",
                "dateTime": "2015-12-22T16:00:00",
                "taskType": "Vendor",
                "vendor": vendor2,
                "budget": "200.00",
                "status": "Complete",
                "event": event
            });
            event = events.insert({
                "owner": "Brandon White",
                "name": "Community Housing",
                "description": "Showing support for those around us by providing much needed housing services.",
                "totalBudget": "2500.00",
                "theme": theme5,
                "status": "Complete",
                "dateTime": "2015-12-28T19:00:00",
                "venue": venue2
            });
            tasks.insert({
                "name": "Hire Caterer",
                "description": "Hire a caterer for 50-75 people",
                "notes": "In talks with caterer, waiting on an estimate",
                "userIdAssignedTo": "1",
                "dateTime": "2015-12-25T17:00:00",
                "taskType": "Vendor",
                "vendor": vendor1,
                "budget": "350.00",
                "status": "Complete",
                "event": event
            });
            event = events.insert({
                "owner": "Brandon White",
                "name": "Financial Planning",
                "description": "How to plan for retirement and setup a savings account for a rainy day.",
                "totalBudget": "1500.00",
                "theme": theme1,
                "status": "Active",
                "dateTime": "2015-12-30T18:00:00",
                "venue": venue3
            });
            tasks.insert({
                "name": "Book Venue for Event",
                "description": "Approximately 100 guests are attending, please book a hall to accommodate this in the Oakville area.",
                "notes": "Take a look at the venue we used last time",
                "userIdAssignedTo": "1",
                "dateTime": "2015-12-25T16:00:00",
                "taskType": "Custom",
                "vendor": "",
                "budget": "1000.00",
                "status": "Complete",
                "event": event
            });
            tasks.insert({
                "name": "Hire Caterer",
                "description": "Hire a caterer for 50-75 people",
                "notes": "In talks with caterer, waiting on an estimate",
                "userIdAssignedTo": "1",
                "dateTime": "2015-12-26T17:00:00",
                "taskType": "Vendor",
                "vendor": vendor1,
                "budget": "500.00",
                "status": "In Progress",
                "event": event
            });
            tasks.insert({
                "name": "Hire a Guest Speaker",
                "description": "A Subject Matter Expert (SME) is required in the field of financial planning.",
                "notes": "Do a Google search to see if we can find anyone nearby",
                "userIdAssignedTo": "1",
                "dateTime": "2015-12-27T16:00:00",
                "taskType": "Custom",
                "vendor": "",
                "budget": "300.00",
                "status": "Not Started",
                "event": event
            });
        }
        if (invitations.find().count() == 0) {
            invitations.insert({
                used: false,
                generatedBy: "Dev_ENV",
                appliedTo: undefined,
                validFor: ["Any"]
            });
        }
        if (configuration.find().count() == 0) {
            configuration.insert({
                "name" : "config-task-create-email",
                "value" : false
            });
            configuration.insert({
                "name" : "config-task-help-email",
                "value" : false
            });
        }
    }
});