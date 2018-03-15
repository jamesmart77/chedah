const client = require("../server.js").redisClient;



module.exports = {
    setClient: function(inClient) { client = inClient; },
    add: name => {
        client.hmset(name, function(err, reply){
            if(err) throw err;
            return reply
        });
        // This is currently sending the object back
    },
    find: theUsersEdits =>{
            // This will find the user within the Redis DB
            client.get(theUsersEdits, function(results){
                console.log(results)
            })
        }

    }
// This will add the ofbject that is sent in and then send its results to the console.
// Adds the hash of the edit body. We can send it in as an array syntax or an argument list of (vairable, {key:value,key:value};
   


