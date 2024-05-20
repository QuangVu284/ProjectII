export const convertDate = (date) => {
  var inputDate = new Date(date);

  var year = inputDate.getFullYear().toString(); 
  var month = ("0" + (inputDate.getMonth() + 1)).slice(-2); 
  var day = ("0" + inputDate.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};
