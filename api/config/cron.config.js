const cron = require("node-cron")

cron.schedule('0 4 * * *', require("../schedulers/out-date-offer.scheduler"));