/**
 * Convert a date to format YYYYMMDD
 * @param {*} thedate 
 */
export const DateToDBDate = (thedate) => {
    let z = thedate.split('-')
    let day = z[0].padStart(2, '0')
    let month = z[1].padStart(2, '0')
    let year = z[2]
    let newDate = year + month + day
    return newDate
}

export const makeDateReadable = (date) => {
    // YYYYMMDD to DD/MM/YYYY
    let normalDate = date.substr(6, 2) + "/" + date.substr(4,2) + "/" + date.substr(0,4)
    return normalDate
}

/**
 * Check if todo is over due
 * @param {*} dueDate 
 */
export const isOverDue = (dueDate) => {
    const theDate = new Date().toLocaleDateString()
    const newDate = DateToDBDate(theDate)
    return newDate > dueDate
}