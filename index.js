// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2], 
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){

    // for(const element in array){
    //     createEmployeeRecord(this, array); 
    // }
    let employeeRecords = []; 
    for(let i = 0; i < array.length; i++){
        employeeRecords.push(createEmployeeRecord(array[i]))
    }
    //let employeeRecords = array.forEach(element => createEmployeeRecord(element))

    return employeeRecords; 
}

function createTimeInEvent(record, date){
    let newDate = {
        hour: parseInt(date.slice(11, 16)),
        date: date.slice(0, 10), 
        type: "TimeIn"
    }
    record.timeInEvents.push(newDate); 
    return record; 
}

function createTimeOutEvent(record, date){
    let newDate = {
        hour: parseInt(date.slice(11, 16)),
        date: date.slice(0, 10), 
        type: "TimeOut"
    }
    record.timeOutEvents.push(newDate); 
    return record; 
}

function hoursWorkedOnDate(record, date){
    let newDate = date.slice(0, 10);
    let start; 
    let end;
    for(let i = 0; i < record.timeInEvents.length; i++){
        if(record.timeInEvents[i].date === newDate){
            start = record.timeInEvents[i].hour;
            end = record.timeOutEvents[i].hour; 
        }
    }
    let hours = (end - start)/100
    return hours; 
}

function wagesEarnedOnDate(record, date){
    let rate = record.payPerHour; 
    return hoursWorkedOnDate(record, date) * rate; 
}

function allWagesFor(record){
    let sum = 0;
    for(let i = 0; i < record.timeInEvents.length; i++){
        sum += wagesEarnedOnDate(record, record.timeInEvents[i].date)
    }
    return sum; 
}

function calculatePayroll(recordArray){
    let sum = 0; 
    for(let i = 0; i < recordArray.length; i++){
        sum += allWagesFor(recordArray[i]); 
    }
    return sum; 
}

function findEmployeeByFirstName(recordArray, name){
    for(let i = 0; i < recordArray.length; i++){
        if(recordArray[i].firstName === name){
            return recordArray[i]
        }
    }
    return undefined; 

}