module.exports  = name => {
    var start = new Date();
    return {
        stop: function() {
            var end  = new Date();
            var time = end.getTime() - start.getTime();
            console.log('Timer:', name, 'finished in', time/1000/60, 'Minutes');
        }
    }
};