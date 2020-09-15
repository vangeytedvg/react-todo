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

/**
 * Check if todo is over due
 * @param {*} dueDate 
 */
export const isOverDue = (dueDate) => {
    const theDate = new Date().toLocaleDateString()
    const newDate = DateToDBDate(theDate)
    return newDate > dueDate
}