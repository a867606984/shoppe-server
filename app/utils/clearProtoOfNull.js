module.exports =  function (obj, keys = []){
    for(let key in obj){
        if(obj[key] === null || obj[key] === undefined) delete obj[key];
    }

    for(let i = 0; i < keys.length; i++){
        if(obj.hasOwnProperty(keys[i])) delete obj[keys[i]]
    }
}