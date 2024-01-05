import moment from "moment";

export default class Appglobal{

    global_date_format='YYYY-MM-DD';

    containsObject(obj, list) {
        //debugger;
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === obj['id']) {
                return true;
            }
        }
    
        return false;
    }
    scroll_to_element(element) {
        //debugger;
        setTimeout(() => {
            const scrollTo = document.querySelector("#" + element);
            if (scrollTo) {
                scrollTo.scrollIntoView({ block: 'start', inline: 'start',behavior: 'smooth'  });
            }
        }, 100);
    }
    getDateAdjustedUTC(dateToTransform) {
        dateToTransform.setTime(
          dateToTransform.getTime() -
            new Date().getTimezoneOffset() * 60 * 1000
        );
        return dateToTransform;
      }
      formatDate(date) {
        return moment(date).format(this.global_date_format);
      }
      getStartDate(){
        let date=new Date();
        return date.setMonth(date.getMonth() - 1);
      }
      getEndDate(){
        return new Date();
      }
}