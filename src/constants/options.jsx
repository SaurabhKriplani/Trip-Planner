export const SelectTravelsList=[
    {
        id:1,
        title:"Just Me ",
        desc:"A Sole Travels in Exploration",
        icon:"✈️",
        people:"1"
    },
    {
        id:2,
        title:"A Couple ",
        desc:"Two trips side by side",
        icon:"🥂",
        people:"2"
    },
    {
        id:3,
        title:"Family",
        desc:"A fun-loving family seeking adventure",
        icon:"🏘️",
        people:"3 to 5"
    },
    {
        id:4,
        title:"Friends",
        desc:"A Bunch of Trill-Seekers",
        icon:"🚤",
        people:"5 to 10"
    }
] 




export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:"Focus on affordability",
        icon:"💸",
    },
    {
        id:2,
        title:"Moderate",
        desc:"Stay within a reasonable budget",
        icon:"💰",
    },
    {
        id:3,
        title:"Luxury",
        desc:"Dont worry about cost",
        icon:"🏝️",
    },
    
]

export const AI_PROMPT = `Generate trip for {location}, {totalDays} days, {Companion}, {budget}. Return ONLY JSON:
{"hotels":[{"name":"Hotel1","address":"Str1","price":8000,"rating":4.5,"description":"Good","image_url":"url","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"Hotel2","address":"Str2","price":10000,"rating":4.7,"description":"Great","image_url":"url","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"Hotel3","address":"Str3","price":12000,"rating":4.6,"description":"Nice","image_url":"url","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"Hotel4","address":"Str4","price":15000,"rating":4.8,"description":"Luxury","image_url":"url","coordinates":{"latitude":48.85,"longitude":2.35}}],"itinerary":[{"day":1,"title":"Day1","places":[{"name":"P1","address":"A","details":"Visit","ticket_pricing":"500","time_to_visit":"2h","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"P2","address":"A","details":"See","ticket_pricing":"400","time_to_visit":"1h","coordinates":{"latitude":48.86,"longitude":2.36}},{"name":"P3","address":"A","details":"Tour","ticket_pricing":"300","time_to_visit":"1h","coordinates":{"latitude":48.84,"longitude":2.34}},{"name":"P4","address":"A","details":"Walk","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.87,"longitude":2.37}},{"name":"P5","address":"A","details":"Shop","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.83,"longitude":2.33}},{"name":"P6","address":"A","details":"View","ticket_pricing":"200","time_to_visit":"1h","coordinates":{"latitude":48.85,"longitude":2.35}}],"lunch":{"name":"R1","address":"A","details":"Eat","cuisine":"Local"},"dinner":{"name":"R2","address":"A","details":"Dine","cuisine":"Local"}},{"day":2,"title":"Day2","places":[{"name":"P1","address":"A","details":"Visit","ticket_pricing":"500","time_to_visit":"2h","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"P2","address":"A","details":"See","ticket_pricing":"400","time_to_visit":"1h","coordinates":{"latitude":48.86,"longitude":2.36}},{"name":"P3","address":"A","details":"Tour","ticket_pricing":"300","time_to_visit":"1h","coordinates":{"latitude":48.84,"longitude":2.34}},{"name":"P4","address":"A","details":"Walk","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.87,"longitude":2.37}},{"name":"P5","address":"A","details":"Shop","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.83,"longitude":2.33}},{"name":"P6","address":"A","details":"View","ticket_pricing":"200","time_to_visit":"1h","coordinates":{"latitude":48.85,"longitude":2.35}}],"lunch":{"name":"R1","address":"A","details":"Eat","cuisine":"Local"},"dinner":{"name":"R2","address":"A","details":"Dine","cuisine":"Local"}},{"day":3,"title":"Day3","places":[{"name":"P1","address":"A","details":"Visit","ticket_pricing":"500","time_to_visit":"2h","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"P2","address":"A","details":"See","ticket_pricing":"400","time_to_visit":"1h","coordinates":{"latitude":48.86,"longitude":2.36}},{"name":"P3","address":"A","details":"Tour","ticket_pricing":"300","time_to_visit":"1h","coordinates":{"latitude":48.84,"longitude":2.34}},{"name":"P4","address":"A","details":"Walk","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.87,"longitude":2.37}},{"name":"P5","address":"A","details":"Shop","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.83,"longitude":2.33}},{"name":"P6","address":"A","details":"View","ticket_pricing":"200","time_to_visit":"1h","coordinates":{"latitude":48.85,"longitude":2.35}}],"lunch":{"name":"R1","address":"A","details":"Eat","cuisine":"Local"},"dinner":{"name":"R2","address":"A","details":"Dine","cuisine":"Local"}},{"day":4,"title":"Day4","places":[{"name":"P1","address":"A","details":"Visit","ticket_pricing":"500","time_to_visit":"2h","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"P2","address":"A","details":"See","ticket_pricing":"400","time_to_visit":"1h","coordinates":{"latitude":48.86,"longitude":2.36}},{"name":"P3","address":"A","details":"Tour","ticket_pricing":"300","time_to_visit":"1h","coordinates":{"latitude":48.84,"longitude":2.34}},{"name":"P4","address":"A","details":"Walk","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.87,"longitude":2.37}},{"name":"P5","address":"A","details":"Shop","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.83,"longitude":2.33}},{"name":"P6","address":"A","details":"View","ticket_pricing":"200","time_to_visit":"1h","coordinates":{"latitude":48.85,"longitude":2.35}}],"lunch":{"name":"R1","address":"A","details":"Eat","cuisine":"Local"},"dinner":{"name":"R2","address":"A","details":"Dine","cuisine":"Local"}},{"day":5,"title":"Day5","places":[{"name":"P1","address":"A","details":"Visit","ticket_pricing":"500","time_to_visit":"2h","coordinates":{"latitude":48.85,"longitude":2.35}},{"name":"P2","address":"A","details":"See","ticket_pricing":"400","time_to_visit":"1h","coordinates":{"latitude":48.86,"longitude":2.36}},{"name":"P3","address":"A","details":"Tour","ticket_pricing":"300","time_to_visit":"1h","coordinates":{"latitude":48.84,"longitude":2.34}},{"name":"P4","address":"A","details":"Walk","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.87,"longitude":2.37}},{"name":"P5","address":"A","details":"Shop","ticket_pricing":"0","time_to_visit":"1h","coordinates":{"latitude":48.83,"longitude":2.33}},{"name":"P6","address":"A","details":"View","ticket_pricing":"200","time_to_visit":"1h","coordinates":{"latitude":48.85,"longitude":2.35}}],"lunch":{"name":"R1","address":"A","details":"Eat","cuisine":"Local"},"dinner":{"name":"R2","address":"A","details":"Dine","cuisine":"Local"}}]}`;





