// Reference the HTML table using d3
var tbody = d3.select("tbody");
// init filter object
var filterObject = {date:"",city:"",state:"",country:"",shape:""};

//*===========================================================*//  
/* Help function:  to build table data with argument data */
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            //innet html (encode html)
            cell.html(val);
        });
	});
}
//*===========================================================*// 
/* Help function:  get the distinct values to load filter input */
function loadOptionFilter(data,field){
    //Select element by Id
    let el = d3.select("#"+field)
    //group data value with the map object (key value)
    let items = d3.map(tableData, i => i[field]).keys();
    //create empty option
    let iOpt = el.append("option");
    iOpt.property("value","");
    iOpt.property("selected","selected");
    iOpt.text("Select a option....");
    //add option in selection
    for(let item of items){
        let opt = el.append("option");
        opt.text(item);
    }
}
//*===========================================================*// 
// function handleClick() {
//     // Grab the datetime value from the filter
//     let date = d3.select("#datetime").property("value");
//     let filteredData = tableData;
//     // Check to see if a date was entered and filter the
//     // data using that date.
//     if (date) {
//         //ISOdatetime string will convert to UTC
//         //add T00:00:00 to show local time
//         date = date + "T00:00:00"
//       // Apply `filter` to the table data to only keep the
//       // rows where the `datetime` value matches the filter value
//       filteredData = filteredData.filter(row => Date.parse(row.datetime) === Date.parse(date));
//     };
//     // Rebuild the table using the filtered data
//     // @NOTE: If no date was entered, then filteredData will
//     // just be the original tableData.
//     buildTable(filteredData);
//   };
//*===========================================================*// 
/* Help function:  Reset the default all filter inputs */
function resetFilterFields(){
    // select element and set property value to empty  
    d3.select("#datetime").property("value","");
    d3.select("#city").property("value","");
    d3.select("#state").property("value","");
    d3.select("#country").property("value","");
    d3.select("#shape").property("value","");
}
//*===========================================================*// 
/* Help function:  Capture all filter values from filter inputs to object */
function setFilterObject(){
    //select element and get property value
    filterObject.date = d3.select("#datetime").property("value");
    filterObject.city = d3.select("#city").property("value");
    filterObject.state = d3.select("#state").property("value");
    filterObject.country = d3.select("#country").property("value");
    filterObject.shape = d3.select("#shape").property("value");
    console.debug(filterObject);
}
//*===========================================================*// 
/* 
Event Handler: Reset all filter inputs and reload table data 
Reset Filters Button is binded with this
*/
function handleResetClick(){
    resetFilterFields();
    buildTable(tableData);
}
/* 
Event Handler: Apply the filter on table data display
all filter Inputs are binded with this
*/
function handleChange(){
    //Capture the filter parameter with input on the from
    setFilterObject()
    // init data table
    let filteredData = tableData;
    // loop through attribute names
    for(let attr in filterObject){
        // the value filter is not empty and not undefine
        let value = filterObject[attr];
        if (value){
                //special convertion between datetime input HTML5 to datetime
                if (attr === "date"){
                        //concat with Time Zone to get the local datetime
                        value = value + "T00:00:00"
                        //filter by date with conversion or parse value to datetime
                        filteredData = filteredData.filter(row => Date.parse(row.datetime) === Date.parse(value));
                }
                else{
                    //filter by text for the attribute name value
                    filteredData = filteredData.filter(row => row[attr] === value);
                }
        }
    }
    //re-build table data with the filter data
    buildTable(filteredData);
}

//*===========================================================*// 
// init load the form
buildTable(tableData);
loadOptionFilter(tableData,"city")
loadOptionFilter(tableData,"state")
loadOptionFilter(tableData,"country")
loadOptionFilter(tableData,"shape")
//*===========================================================*// 
// binding events
//d3.select("#filter-btn").on("click", handleClick);
d3.select("#filter-reset-btn").on("click", handleResetClick);
d3.selectAll("input,select").on("change", handleChange);

