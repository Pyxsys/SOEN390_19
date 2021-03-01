const fs = require('fs');   //import file system
const log_filepath = '../Data/Logs/'

const getRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9;                         //Convert to nanoseconds
    const NS_TO_MS = 1e6;                           //Convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

module.exports = function(){
    return function (req, res, next) {

        //Get request metadata
        let user = "User"; //TODO, obtain user form context

        let current_datetime = new Date();
        let formatted_date =
            current_datetime.getFullYear() + "-" +
            (current_datetime.getMonth() + 1) + "-" +
            current_datetime.getDate();
        let formatted_time = 
            current_datetime.getHours() + ":" +
            current_datetime.getMinutes() + ":" +
            current_datetime.getSeconds();

        const start = process.hrtime();
        const req_duration = getRequestDurationInMilliseconds(start).toLocaleString();

        // reconstructs json body of request
        const entries = Object.keys(req.body);
        const contents = {};
        for (let i = 0; i < entries.length; i++) {
            contents[entries[i]] = Object.values(req.body)[i];
        }
        let request_body = JSON.stringify(contents);

        //Gen outputs
        let console_string = `[${formatted_date} ${formatted_time}] (${user}) ${req.method}:${req.url} ${res.statusCode} ${req_duration} ms`;
        let file_string = `${console_string} | body: ${request_body} \n`;
        
        //Display shortened version to console
        console.log(console_string);

        //Append request to file
        target_file_name = log_filepath + "requestlog [" + formatted_date + "].log";    //allows to generate a new file automatically every day
        fs.appendFile(target_file_name, 
            file_string, 
            err => { if (err) { console.log(err); } }
        );
        
        next();
    }
}