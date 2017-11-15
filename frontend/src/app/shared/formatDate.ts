export class FormatDate {
    formatDate(date): string {
        const day = date.slice(8, 10);
        const year = date.slice(11, 15);
        let month = '';
    
        switch (date.slice(4, 7)) {
          case 'Nov':
            month = '10';
            break;
          case 'Jan':
            month = '01';
            break;
          case 'Feb':
            month = '02';
            break;
          case 'Mar':
            month = '03';
            break;
          case 'Apr':
            month = '04';
            break;
          case 'May':
            month = '05';
            break;
          case 'Jun':
            month = '06';
            break;
          case 'Jul':
            month = '07';
            break;
          case 'Aug':
            month = '08';
            break;
          case 'Sep':
            month = '09';
            break;
          case 'Oct':
            month = '11';
            break;
          case 'Dec':
            month = '12';
            break;
        }
    
        return year + '-' + month + '-' + day;
      }
}