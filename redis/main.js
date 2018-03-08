const redis = require("redis");
const client = redis.createClient(process.env.REDISCLOUD_URL,"", {
  no_ready_check: true
});


// This will add the ofbject that is sent in and then send its results to the console.
const add = (name, body)=> {
    // Adds the hash of the edit body. We can send it in as an array syntax or an argument list of (vairable, {key:value,key:value};
    client.hmset(name, body);
    console.log("Redis add stuff command is out of whack, but I will survive")
    // This is currently sending the object back
    client.hgetall(body, function(err, object){
        console.log(JSON.stringify(object));
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

add("Justin",{
    name: "Justin",
    address:"Boston,MA"
})
module.exports = {
    add: add,
    client: client,
    find: find
}

