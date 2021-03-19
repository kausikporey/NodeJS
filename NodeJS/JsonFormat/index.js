const bioData = {
    name:"kausik",
    age : 22,
    course : "B.Tech"
};
console.log(bioData.name);
const jsondata = JSON.stringify(bioData);  //Convert from object to Json data
console.log(jsondata);
const orgdata = JSON.parse(jsondata); //convert from json data to object
console.log(orgdata);
console.log(orgdata.name);