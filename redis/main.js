const redis = require("redis");
const client = redis.createClient();

// This will add the ofbject that is sent in and then send its results to the console.
const add = (name, body)=> {
    // Adds the hash of the edit body. We can send it in as an array syntax or an argument list of (vairable, {key:value,key:value};
    client.hmset(name, {body});
    console.log(`Added ${editBody}`)
    // This is currently sending the object back
    client.hgetall(editBody[0], function(err, object){
        console.log(object);
    })
}

const find = theUsersEdits => {
    // The user Edits is going to have to fbe the user._id that was can pass in
    console.log("Within the finder.......")
    // This will find the user within the Redis DB
    client.get(theUsersEdits, function(err, results){
        console.log(results)
    })
};

module.exports = {
    add: add,
    client: client,
    find: find
}

