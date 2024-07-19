//module


// const name = "Gourav Kadyan";

//then want to export multiple
// const age = "69"

// module.exports = {name, age}; //type : commonjs
// export default name //if you change type:module in package.json and if it is single value
// export {name, age}


export const genaratePercent = () => {
    return `${~~(Math.random()*100)}%` // ~~ same as Math.floor
}