const sum = async(a,b) =>{
    console.log("Before Addition.");
    c = await a+b;  //jump outside the function and run the outside work.
    console.log(c);
}
sum(2,3)
console.log('After Printing statement.');