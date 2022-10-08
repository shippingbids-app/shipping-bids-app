const cron = require("node-cron")

cron.schedule('* * * * *', require("../schedulers/out-date-offer.scheduler"));