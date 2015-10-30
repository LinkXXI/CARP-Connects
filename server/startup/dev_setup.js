Meteor.startup(function () {
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
        if (vendors.find().count() == 0) {
            vendors.insert({
                "_id": "1",
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
            vendors.insert({
                "_id": "2",
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
            venues.insert({
                "_id": "1",
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
            venues.insert({
                "_id": "2",
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
        }
        if (events.find().count() == 0) {
            events.insert({
                "owner": "Brandon White",
                "name": "Retirees and Healthy Living",
                "description": "Showing members how to live healthy",
                "totalBudget": "2500.00",
                "theme": "Health",
                "status": "complete",
                "dateTime": "2015-10-15T04:00:00",
                "tasks": [
                    {
                        "name": "Hire Caterer",
                        "description": "Hire a caterer for 50-75 people",
                        "notes": "In talks with caterer, waiting on an estimate",
                        "userIdAssignedTo": "1",
                        "dateTime": "2015-10-10T04:00:00",
                        "taskType": "Vendor",
                        "vendor": "Bobs Food Service",
                        "budget": "350.00",
                        "status": "Complete"
                    },
                    {
                        "name": "Book Venue for Event",
                        "description": "Approximately 100 guests are attending, please book a hall to accommodate this in the Oakville area.",
                        "userIdAssignedTo": "1",
                        "dateTime": "2015-10-17T04:00:00",
                        "taskType": "Vendor",
                        "vendor": "Bobs Food Service",
                        "budget": "1000.00",
                        "status": "In Progress"
                    },
                    {
                        "name": "Hire a Guest Speaker",
                        "description": "A Subject Matter Expert (SME) is required in the field of financial planning.",
                        "userIdAssignedTo": "1",
                        "dateTime": "2015-10-24T04:00:00",
                        "taskType": "Vendor",
                        "vendor": "Bobs Food Service",
                        "budget": "200.00",
                        "status": "Not Started"
                    }
                ],
                "venue": "1"
            });
            events.insert({
                "owner": "Brandon White",
                "name": "Community Housing",
                "description": "Showing support for those around us by providing much needed housing services.",
                "totalBudget": "2500.00",
                "theme": "Community",
                "status": "complete",
                "dateTime": "2015-10-20T04:00:00",
                "tasks": [
                    {
                        "name": "Hire Caterer",
                        "description": "Hire a caterer for 50-75 people",
                        "notes": "In talks with caterer, waiting on an estimate",
                        "userIdAssignedTo": "1",
                        "dateTime": "2015-10-15T04:00:00",
                        "taskType": "Vendor",
                        "vendor": "Bobs Food Service",
                        "budget": "350.00",
                        "status": "In Progress"
                    }
                ],
                "venue": "2"
            })
        }
        if(invitations.find().count() == 0){
            invitations.insert({
                used: false,
                generatedBy: "Dev_ENV",
                appliedTo: undefined,
                validFor: ["Any"]
            })
        }
    }
});