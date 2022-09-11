export const timeNow = () => {
  var date = new Date();

  const time =
    date.getFullYear() +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    ('0' + date.getDate()).slice(-2) +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2) +
    ':' +
    ('0' + date.getSeconds()).slice(-2);

  return time;
};
