import { isValid } from "date-fns";

export function formatedDateString (dateStr: string) {
    const darr = dateStr.split("/");
    var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  
    if (dateStr.match(reg)) {
      let dateString =  `${darr[2]}-${darr[1]}-${darr[0]}`
      return dateString
    }
}

export function stringToDate (dateStr: string) {
    const darr = dateStr.split("/");
    var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  
    if (dateStr.match(reg)) {
      let dobj = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]), 0, 0, 0);
      return isValid(dobj)
    }
  }
  