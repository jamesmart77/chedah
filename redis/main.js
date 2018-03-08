const client = require("../server.js")

// This will add the ofbject that is sent in and then send its results to the console.
const add = (name)=> {
    // Adds the hash of the edit body. We can send it in as an array syntax or an argument list of (vairable, {key:value,key:value};
    client.redisClient.hmset(name, function(err, reply){
        if(err) throw err;
        console.log(reply)
    });
    // This is currently sending the object back
    client.redisClient.hgetall(name[0], function(err, reply){
        if(err) throw err;
        console.log(reply)
    })
}

const find = theUsersEdits => {
    // The user Edits is going to have to fbe the user._id that was can pass in
    console.log("Within the finder.......")
    // This will find the user within the Redis DB
    client.get(theUsersEdits, function(results){
        console.log(results)
    })
};

add(["user", "name","Justin", "address","Boston"]);
module.exports = {
    add: add,
    find: find
}

