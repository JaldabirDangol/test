const express = require("express");

const app = express();
app.use(express.json());

var users = [{
    name: "Jaldabir",
    metadata: {
        profilepicture: "facebook.com/jaldabirdangol",
        address: "samundratar"
    },
    kidneys: [
        { healthy: true },
        { healthy: false },
        { healthy: false },
        { healthy: true },
        { healthy: false },
        { healthy: true },
        { healthy: true },
        { healthy: true },
        { healthy: true }
    ]
}];

app.get("/something", function (req, res) {
    const userKidneys = users[0].kidneys;
    const numberOfKidneys = userKidneys.length;
    let numberOfHealthyKidneys = 0;
    
    for (let i = 0; i < numberOfKidneys; i++) {
        if (userKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post("/something", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Done"
    });
});

app.put("/something", function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg: "All kidneys set to healthy"
    });
});

app.delete("/something", function (req, res) {
    const newKidneys = users[0].kidneys.filter(kidney => kidney.healthy);
    users[0].kidneys = newKidneys;
    res.json({
        msg: "Unhealthy kidneys removed"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
