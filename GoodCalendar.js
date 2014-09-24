var Calendar = function(_date, _showWeek, _sundayFirst, _styles){
    
    var date = _date; 
    var showWeek = _showWeek;  
    var sundayFirst = _sundayFirst;
    
    if (date==null) {date = new Date();}
    if (showWeek==null) {showWeek = false;}
    if ( sundayFirst == null) {sundayFirst = false;}       
    
    function STYLES(styles_T) {
	this.unique_id= "calendar";
	this.title ="title_style";
	this.table= "cal_table";
	this.thead= "thead_class";
	this.th= "th_class";
	this.thr= "thr_class";
	this.thd= "thd_class";
	this.button= "button_style";
	this.extraButtonData= " ";
	this.button_content = { back_month: "<<", back_day: "<", forward_month:">", forward_day:">>"};
	this.dayTitle = "day_title_class",
	this.tbody= "tbody_class";
	this.tr= "tr_class";
	this.td= "td_class";
	this.calDiv= "calDiv_class";
	this.extraDayData= " ";
	
	 for (x in styles_T) {
	    this[x] = styles_T[x];
	}           
    };        
    
    var styles = new STYLES(_styles);
    
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
     
    var daysShort = [];//["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    
    var daysShortMondayFirst = [];//["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    
    for( day in days){
	daysShort[day] = days[day].substring(0,3);
	if ( day == 0) daysShortMondayFirst[days.length-1] = days[day].substring(0,3);
	else daysShortMondayFirst[day-1] = days[day].substring(0,3);
    }
    
    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthsShort = [];
    
    for( var i = 0; i < months.length; i++)
    {
	monthsShort[i] = months[i].substring(0,3);
    }
     
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
 
    /* Taken from the following resource
     <!--   HTML coding exclusively with the CoffeeCup HTML 2010 Editor --> 
     <!--          http://www.coffeecup.com                             --> 
     <!--   First online in September 1977 as part of the ARPAnet group --> 
     <!--   Brewed on December 6 1994 1:09:21 PM                        --> 
     <!--   Updated on September 6 2001 4:18:12 AM                      --> 
     <!--   Last updated on November 28 2010 8:22:45 PM                 --> 
     <!--   Created by Dr. Gene Davis - Computer Support Group          --> 
     */   
     function IsLeapYear(Year){
	 if(Math.round(Year/4) == Year/4){
		 if(Math.round(Year/100) == Year/100){
			 if(Math.round(Year/400) == Year/400)
				 return true;
			 else return false;
		 }else return true;
	 }
	 return false;
     }
	 
    function buildTableHeader(month, year, b_showWeek, sundayFirst, styles){
        var S = "<thead class=\""+ styles.thead +"\">"+
                "<tr class=\""+ styles.thr+"\">"+
                    "<td id = \"title_date\" class=\"title " + styles.thd + "\" colspan=\""+(b_showWeek ? 8:7)+"\"><h1 class=\""+styles.title+"\">"+monthsShort[month]+" "+year+"</h1></td>"+
                " </tr>"+
                "<tr class=\""+ styles.thr+"\">"+
                    "<td class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.back_month+"</td>"+
                    "<td class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.back_month+"</td>"+
                    "<td class=\"" +styles.button+ " " + styles.thd + " " + styles.dayTitle + "\" colspan=\""+(b_showWeek ? 4:3)+"\">"+days[date.getDay()]+" "+date.getDate()+"</td>"+
                    "<td class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.forward_day+"</td>"+
                    "<td class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.forward_month+"</td>"+
                "</tr>";
            S += "<tr class=\""+ styles.thr+"\">";
        
        if ( b_showWeek ) {
                S +="<th class=\"week " + styles.th + "\">Week</th>";
        }

        for ( var i = 0; i < 7; i++) {
            if ( i==0 || i== 6) {
                S += "<th class=\"" + styles.th + "\">"+ (sundayFirst?daysShort[i]:daysShortMondayFirst[i]) +"</th>";
            } else {
                S+= "<th class=\"" + styles.th + "\">"+ (sundayFirst?daysShort[i]:daysShortMondayFirst[i])+"</th>";
            }
        }
        S+= "</tr></thead>";
        
        return S;
    }
    
  
    this.Create = function(){
    
        var today = date.getDay();
        if ( !sundayFirst ) {
            if ( today == 0)today = 6;
            else today =today- 1;
        }
        
        var month = date.getMonth();
        var year = date.getFullYear();
        var numberOfTheMonth = date.getDate();
        var dayOfTheWeek = daysShort[today];
        
         var lastMonth = function(m){
            if(m==0)return 11;
            else return m-1;
        };
        var nextMonth = function(m){
            if(m ==11)return 0;
            else return m+1;
        };
        var funcDaysInMonth = function(m) {
            if(m==1){
                if(!IsLeapYear(year))return 28;
                else return 29;
            }else return daysInMonth[m];
        };
        
        var funcDaysInLastMonth = function(m){
            return funcDaysInMonth( lastMonth(m) );    
        };
        
        var numDaysInMonth = funcDaysInMonth(month);
        var daysInLastMonth = funcDaysInLastMonth(month);
        var firstOfTheMonth = new Date(year, month, 1); // year, month, day, hour, minute, second, and millisecond
        var firstOfTheMonthDay = firstOfTheMonth.getDay();
        if ( !sundayFirst ) {
            if(firstOfTheMonthDay==0)firstOfTheMonthDay=6;
            else firstOfTheMonthDay -= 1;
        }

        var S = "<table class=\"" + styles.table + "\" id=\""+styles.unique_id+"\">";
        
            S += buildTableHeader(month, year, showWeek, sundayFirst, styles);
        
        S+= "<tbody class=\"table_body " + styles.tbody +"\">";
            var loopWeek = showWeek ? 8: 7;
            var comp1 = showWeek ? 1: 0;
            var comp2 = showWeek ? 7: 6;
	    if ( !sundayFirst) {
		comp1 = comp2-1;
	    }
            var beginningOfNextMonthReset = false;
            var dayCount = 0; 
            var setFirstDay = false;
            for( var i=0; i < 6; i++) {      
                S+= "<tr class=\"days " + styles.tr +"\">"; 
                for( var j=0; j < loopWeek; j++) {
                    if ( i == 0 && !setFirstDay) {  
                        if ( !showWeek) {
                            if (j == firstOfTheMonthDay) {
                                setFirstDay = true;
                                dayCount = 0;
                            } else{ dayCount = daysInLastMonth - (firstOfTheMonthDay) + j +1; }
                        } else {
                            if (j-1 == firstOfTheMonthDay) {
                                setFirstDay = true;
                                dayCount = 0;
                            } else { if (j!=0) { dayCount = daysInLastMonth - (firstOfTheMonthDay) + j; }}
                        }
                    }
                    if (setFirstDay) {
                        if (!showWeek) {
                            dayCount++;
                        }
                        else if (j != 0) {
                            dayCount++;
                        }
                        if ( dayCount > numDaysInMonth && !beginningOfNextMonthReset  ) {
                            dayCount = 1;
                            beginningOfNextMonthReset = true;
                        }    
                    }
                    if ( j==0 && showWeek ) {S+= "<td class=\"week " + styles.td +"\">"+i+"</td>"; }
                    else if ( j == comp1 ) {S+= "<td class=\"weekend " + styles.td +"\"><div class=\""+styles.calDiv+"\" id=\""+styles.unique_id+"_"+(beginningOfNextMonthReset?"r":"")+dayCount+"_"+(beginningOfNextMonthReset?(month==11?0:month+1):(!setFirstDay?(month==0?11:month-1):month))+"\" "+styles.extraDayData+">" + dayCount + "</div></td>";}
                    else if ( j == comp2 ) {S+= "<td class=\"weekend "+ styles.td +"\"><div class=\""+styles.calDiv+"\"  id=\""+styles.unique_id+(beginningOfNextMonthReset?"r":"")+"_"+dayCount+"_"+(beginningOfNextMonthReset?(month==11?0:month+1):(!setFirstDay?(month==0?11:month-1):month))+"\" "+styles.extraDayData+">" + dayCount + "</div></td>";}
		    else {S+= "<td class=\"" + styles.td +"\"><div class=\""+styles.calDiv+"\" id=\""+styles.unique_id+(beginningOfNextMonthReset?"r":"")+"_"+dayCount+"_"+(beginningOfNextMonthReset?(month==11?0:month+1):(!setFirstDay?(month==0?11:month-1):month))+ "\" "+styles.extraDayData+">" + dayCount + "</div></td>";}
                }
                S+= "</tr>";
            }
        S+= "</tbody>"; 
        S += "</table>";
        
        return S;
    }
    
    this.setIndividualDayStyles = function(events, _event_elements)
    {
	var event_elements;
	if ( _event_elements == null) {
	    event_elements = function(str){
		return "document.getElementById(str).style.backgroundColor = \"red\";";
	    }
	}else {
	    event_elements = _event_elements;
	}
	var setEventsLoopCount = daysInMonth[date.getMonth()];
    
	var myNumber = 128;
	for( var i = 1; i < setEventsLoopCount+1; i++){
	    var str = styles.unique_id +"_"+i.toString(10)+"_"+date.getMonth();
            if ( events[i]!=0) {
		eval(event_elements(str));
	    }
	}	
    }
    
    this.getDate = function() {return date;}
    this.getDay = function() {return date.getDay();}
    this.getDayStr = function(){ return this.days[getDay()];}
    this.getDayOfTheMonth = function(){return date.getDate();}
    this.getMonth = function(){return date.getMonth();}
    this.getMonthStr = function(){return months[date.getMonth()];}
    this.getYear = function(){return date.getYear();}
    
    this.getDateFromID = function(id){
	var new_array = id.split("_");

	var month = new_array[2]
	var this_year = this.getYear();
	this_year += 1900;
	
	return new Date(this_year, month, new_array[1]);
    }
    
    return this;
};