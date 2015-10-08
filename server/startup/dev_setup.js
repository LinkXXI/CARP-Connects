Meteor.startup(function () {
    if (process.env.NODE_ENV === "development") {
        if (events.find().count() == 0) {
            events.insert({
                "id": "1",
                "owner": "Brandon White",
                "name": "Retirees and Healthy Living",
                "description": "Showing members how to live healthy",
                "totalBudget": "2500.00",
                "theme": "Health",
                "status": "Complete",
                "dateTime": "2015-10-15T04:00:00",
                "venue": {
                    "venueId": "7",
                    "name": "Radisson Hotel Toronto East",
                    "description": "Nice venue in Toronto",
                    "parkingAvailability": "true",
                    "publicTransportationAccess": "true",
                    "address": {
                        "addressId": "7",
                        "line1": "55 Hallcrown Place",
                        "line2": "",
                        "line3": "",
                        "city": "Toronto",
                        "provinceState": "Ontario",
                        "country": "Canada",
                        "postalZipCode": "M2J 4R1"
                    }
                }
            });
            events.insert({
                "id": "2",
                "owner": "Brandon White",
                "name": "Community Housing",
                "description": "Showing support for those around us by providing much needed housing services.",
                "totalBudget": "2500.00",
                "theme": "Community",
                "status": "Complete",
                "dateTime": "2015-10-20T04:00:00",
                "venue": {
                    "venueId": "6",
                    "name": "Holiday Inn Toronto East",
                    "description": "Nice venue in Toronto",
                    "parkingAvailability": "true",
                    "publicTransportationAccess": "true",
                    "address": {
                        "addressId": "6",
                        "line1": "50 Estate Dr.",
                        "line2": "",
                        "line3": "",
                        "city": "Scarborough",
                        "provinceState": "Ontario",
                        "country": "Canada",
                        "postalZipCode": "M1H 2Z1"
                    }
                }
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