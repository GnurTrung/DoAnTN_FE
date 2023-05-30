export const dateTimeFormat = (stringTime) => {
    if (!stringTime || typeof stringTime != 'string')
        return ''
    const date = stringTime.split('T')[0]
    const time = stringTime.split('T')[1]
    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]
    const timeFormat = time.split('.')[0]
    return `${timeFormat.slice(0,5)} UTC, ${day}/${month}`;
}
export const isDateGreater = (date1, date2) => {
    return (date1 - date2) <= 0 ? false : true;
}