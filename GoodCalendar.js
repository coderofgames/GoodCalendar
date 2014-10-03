var Calendar = function(_date, _showWeek, _sundayFirst, _styles){
    
    this.date = _date; 
    this.showWeek = _showWeek;  
    this.sundayFirst = _sundayFirst;
    
    if (this.date==null) {this.date = new Date();}
    if (this.showWeek==null) {this.showWeek = false;}
    if ( this.sundayFirst == null) {this.sundayFirst = false;}       
    
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
	this.button_content = { back_month: "<<", back_day: "<", forward_month:">>", forward_day:">"};
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
    
    function calObject(d, m, y){
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.td_id = 0;
        this.cd_id = 0;
        
        this.setIDs=function(_td_id, _cd_id)
        {
            this.td_id = _td_id;
            this.cd_id = _cd_id;
        }
        
        if ( d!= null) {
            this.day = d;
        }
        if ( m != null ) {
            this.month = m;
        }
        if ( y != null ) {
            this.year = y;
        }
        
        this.setDay = function(d2)
        {
            if (d2 != null) {
                this.day = d2;
            }   
        }
        this.setMonth = function(m2)
        {
            if (m2 != null) {
                this.month = m2;
            }   
        }
        this.setYear = function(y2)
        {
            if (y2 != null) {
                this.year = y2;
            }   
        }           
        this.setValues = function(d2, m2, y2){
            this.setDay(d2);
            this.setMonth(m2);
            this.setYear(y2);            
        }
        
    }
    
    this.calArray = [];
    for( var i=0; i < 6 ; i++){
        
        if( this.showWeek ){
            this.calArray[i] = new Array(8);
        }
        else
        {
            this.calArray[i] = new Array(7);
        }
    }
    
    for( var i =0; i < 6; i++ )
    {
        for( var j = 0; j < (this.showWeek?8:7); j++)
        {
            this.calArray[i][j] = new calObject(0,0,0);
        }
    }
    
    var styles = new STYLES(_styles);
    
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
     
    var daysShort = [];//["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    
    var daysShortMondayFirst = [];//["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    
    for( var i = 0; i < days.length; i++ ){
	daysShort[i] = days[i].substring(0,3);
	if ( i == 0) daysShortMondayFirst[days.length-1] = days[i].substring(0,3);
	else daysShortMondayFirst[i-1] = days[i].substring(0,3);
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
	 
    var buildTableHeader = function(_d, month, year, b_showWeek, sundayFirst, styles){
        var S = "<thead class=\""+ styles.thead +"\" id= \"calTableHead\">"+
                "<tr class=\""+ styles.thr+"\">"+
                    "<td class=\"title " + styles.thd + "\" colspan=\""+(b_showWeek ? 8:7)+"\" id = \"cal_title\"><h1 id = \"title_date\" class=\""+styles.title+"\">"+monthsShort[month]+" "+year+"</h1></td>"+
                " </tr>"+
                "<tr class=\""+ styles.thr+"\">"+
                    "<td id=\"back_month\" class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.back_month+"</td>"+
                    "<td id=\"back_day\" class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.back_day+"</td>"+
                    "<td id=\"day_title\" class=\"" +styles.button+ " " + styles.thd + " " + styles.dayTitle + "\" colspan=\""+(b_showWeek ? 4:3)+"\">"+days[_d.getDay()]+" "+_d.getDate()+" "+months[_d.getMonth()]+"</td>"+
                    "<td id=\"forward_day\" class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.forward_day+"</td>"+
                    "<td id=\"forward_month\" class=\"" +styles.button+ " " + styles.thd + "\">"+styles.button_content.forward_month+"</td>"+
                "</tr>";
            S += "<tr class=\""+ styles.thr+"\">";
        
        if ( b_showWeek ) {
                S +="<th class=\"week " + styles.th + "\" id=\"showweek\">Week</th>";
        }

        for ( var i = 0; i < 7; i++) {
            if ( i==0 || i== 6) {
                S += "<th class=\"" + styles.th + "\" id=\"th_" + i+ "\">"+ (sundayFirst?daysShort[i]:daysShortMondayFirst[i]) +"</th>";
            } else {
                S+= "<th class=\"" + styles.th + "\" id=\"th_" + i+ "\">"+ (sundayFirst?daysShort[i]:daysShortMondayFirst[i])+"</th>";
            }
        }
        S+= "</tr></thead>";
        
        return S;
    }
    
    this.fillTableHeader = function(){
        var thead = document.getElementById("calTableHead");
        var calTitle = document.getElementById("cal_title");
        calTitle.setAttribute( "colspan", (this.showWeek?8:7));
        calTitle.firstChild.innerHTML = monthsShort[this.getMonth()] + " " +this.getYear();
        
        var back_month = document.getElementById("back_month");
        var forward_month = document.getElementById("forward_month");
        var day_title = document.getElementById("day_title");
        
        day_title.innerHTML = days[this.date.getDay()]+" "+this.date.getDate()+" "+months[this.date.getMonth()];
        
        
        if ( this.showWeek) {
            var loopNode = thead.firstChild;
            for( var j = 0; j < 3; j++ )
            {
                if( loopNode.next )
                {
                    loopNode = loopNode.next;
                }
            }
            if ( loopNode.firstChild.id != "showweek") {
                var newnode = document.createElement("th");
                newnode.classList.add("week");
                newnode.classList.add("styles.th ");
                newnode.setAttribute("id", "showweek");
                loopNode.insertBefore(newnode, loopNode.firstChild )
            }
        }
        
        
        for( var i = 0; i < 7; i++ ) {
            var th_i = document.getElementById("th_" + i);
            th_i.innerHTML = (this.sundayFirst?daysShort[i]:daysShortMondayFirst[i]);
            
        }
    }
    
    this.getBackMonthButtonId = function(){
        return "back_month";
    }
    
    this.getForwardMonthButtonId = function(){
        return "forward_month";
    }
    
    var lastMonth = function(m){
        if(m==0)return 11;
        else return m-1;
    };
    
    var nextMonth = function(m){
        if(m ==11)return 0;
        else return m+1;
    };
    
    this.funcDaysInMonth = function(y,m) {
        if(m==1){
            if(!IsLeapYear(y))return 28;
            else return 29;
        }else return daysInMonth[m];
    };
        
    this.funcDaysInLastMonth = function(y,m){
            return this.funcDaysInMonth( y, lastMonth(m) );    
    };
    
    
    var resolveMonth = function( _beginningOfNextMonthReset, _month, _setFirstDay ){
        return (_beginningOfNextMonthReset?(_month==11?0:_month+1):(!_setFirstDay?(_month==0?11:_month-1):_month));
    }
    
    var resolveYear = function(_beginningOfNextMonthReset, _year, _month, _setFirstDay){
        if (_month == 11) {
            if (_beginningOfNextMonthReset ) {
                return _year+1;
            }
        }
        else if ( _month == 0 ){
            if ( !_setFirstDay ) {
                return _year-1;
            }
        }
        
        return _year;
    }
    

  
    this.Create = function(){
    
        var today = this.date.getDay();
        if ( !this.sundayFirst ) {
            if ( today == 0)today = 6;
            else today =today- 1;
        }
        
        var month = this.date.getMonth();
        var year = this.date.getFullYear();
        var numberOfTheMonth = this.date.getDate();
        var dayOfTheWeek = daysShort[today];
        

        
        var numDaysInMonth = this.funcDaysInMonth(month);
        var daysInLastMonth = this.funcDaysInLastMonth(month);
        var firstOfTheMonth = new Date(year, month, 1); // year, month, day, hour, minute, second, and millisecond
        var firstOfTheMonthDay = firstOfTheMonth.getDay();
        if ( !this.sundayFirst ) {
            if(firstOfTheMonthDay==0)firstOfTheMonthDay=6;
            else firstOfTheMonthDay -= 1;
        }

        var S = "<table class=\"" + styles.table + "\" id=\""+styles.unique_id+"\">";
        
            S += buildTableHeader(this.date, month, year, this.showWeek, this.sundayFirst, styles);
        
        S+= "<tbody class=\"table_body " + styles.tbody +"\">";
            var loopWeek = this.showWeek ? 8: 7;
            var comp1 = this.showWeek ? 1: 0;
            var comp2 = this.showWeek ? 7: 6;
	    if ( !this.sundayFirst) {
		comp1 = comp2-1;
	    }
            var beginningOfNextMonthReset = false;
            var dayCount = 0; 
            var setFirstDay = false;
            for( var i=0; i < 6; i++) {      
                S+= "<tr class=\"days " + styles.tr +"\">"; 
                for( var j=0; j < loopWeek; j++) {
                    if ( i == 0 && !setFirstDay) {  
                        if ( !this.showWeek) {
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
                        if (!this.showWeek) {
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
                    var monthResolved = resolveMonth(beginningOfNextMonthReset,month,setFirstDay);
                    var yearResolved = resolveYear(beginningOfNextMonthReset, year, month, setFirstDay);
                    var td_id = "td_" + i + "_" + j;
                    var cd_id = styles.unique_id+"_"+dayCount+"_"+monthResolved+"_"+yearResolved;
                    this.calArray[i][j].setValues(dayCount, monthResolved, yearResolved);
                    this.calArray[i][j].td_id = td_id;
                    this.calArray[i][j].cd_id = cd_id;
                    if ( j==0 && this.showWeek )
                    {
                        S+= "<td class=\"week " + styles.td +"\"><p>"+i+"</p></td>";
                        this.calArray[i][j].setValues(0,0,0);
                    }
                    else if ( j == comp1 )
                    {

                        S+= "<td class=\"weekend " + styles.td +"\" id = \"" + td_id + "\"><div class=\""+styles.calDiv+"\" id=\"" + cd_id+"\" "+styles.extraDayData+"><p>" + dayCount + "</p></div></td>";
                        
                    }
                    else if ( j == comp2 )
                    {
                        S+= "<td class=\"weekend "+ styles.td +"\" id=\"" +td_id+ "\"><div class=\""+styles.calDiv+"\"  id=\"" + cd_id+"\" "+styles.extraDayData+"><p>" + dayCount + "</p></div></td>";
                       
                    }
		    else {
                        S+= "<td class=\""+ styles.td +"\" id=\"" +td_id+ "\"><div class=\""+styles.calDiv+"\" id=\"" + cd_id+"\" "+styles.extraDayData+"><p>" + dayCount + "</p></div></td>";

                    }
                }
                S+= "</tr>";
            }
        S+= "</tbody>"; 
        S += "</table>";
        
        return S;
    }
    

    this.fill = function()
    {
        
        
         var today = this.date.getDay();
        if ( !this.sundayFirst ) {
            if ( today == 0)today = 6;
            else today =today- 1;
        }
        
        var month = this.date.getMonth();
        
        var year = this.date.getFullYear();
        var numberOfTheMonth = this.date.getDate();
        var dayOfTheWeek = daysShort[today];
        

        
        var numDaysInMonth = this.funcDaysInMonth(year,month);
        var daysInLastMonth = this.funcDaysInLastMonth(year, month);
        var firstOfTheMonth = new Date(year, month, 1); // year, month, day, hour, minute, second, and millisecond
        var firstOfTheMonthDay = firstOfTheMonth.getDay();
        if ( !this.sundayFirst ) {
            if(firstOfTheMonthDay==0)firstOfTheMonthDay=6;
            else firstOfTheMonthDay -= 1;
        }
        
        
        this.fillTableHeader();
        
        var loopWeek = this.showWeek ? 8: 7;
        var comp1 = this.showWeek ? 1: 0;
        var comp2 = this.showWeek ? 7: 6;
	if ( !this.sundayFirst) {
	    comp1 = comp2-1;
	}
        var beginningOfNextMonthReset = false;
        var dayCount = 0; 
        var setFirstDay = false;
        for( var i = 0; i < 6; i++)
        {
            for( var j = 0; j < (this.showWeek?8:7); j++ )
            {
                    if ( i == 0 && !setFirstDay) {  
                        if ( !this.showWeek) {
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
                        if (!this.showWeek) {
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
                    var monthResolved = resolveMonth(beginningOfNextMonthReset,month,setFirstDay);
                    var yearResolved = resolveYear(beginningOfNextMonthReset, year, month, setFirstDay);
                    var td_id = "td_" + i + "_" + j;
                    var cd_id = styles.unique_id+"_"+dayCount+"_"+monthResolved+"_"+yearResolved;
                    
                    var old_td_id = this.calArray[i][j].td_id;
                    var old_root = document.getElementById(old_td_id);//.setAttribute("id", td_id);
                    
                    var old_cd_id = this.calArray[i][j].cd_id;
                    
                    var innerNode = old_root.firstChild;;
                    
                    while (innerNode.firstChild) {
                        innerNode.removeChild(innerNode.firstChild);
                    }
                    
                    
                    innerNode.innerHTML = "<p>"+dayCount + "</p>";
                    
                    old_root.setAttribute("id", td_id);
                    old_root.firstChild.setAttribute("id", cd_id);
                    this.calArray[i][j].setValues(dayCount, monthResolved, yearResolved);
                    //this.calArray[i][j].setIDs(td_id, cd_id);
                    this.calArray[i][j].td_id = td_id;
                    this.calArray[i][j].cd_id = cd_id;
            }
        }
        
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
	var setEventsLoopCount = daysInMonth[this.date.getMonth()];
    
	setEventsLoopCount = (setEventsLoopCount < events.length? setEventsLoopCount:events.length);
    
	var myNumber = 128;
	for( var i = 1; i < setEventsLoopCount+1; i++){
	    var str = styles.unique_id +"_"+i.toString(10)+"_"+this.date.getMonth() + "_" + this.getYear();
            if ( events[i]!=0) {
		eval(event_elements(str));
	    }
	}	
    }
    
    this.getDate = function() {return this.date;}
    this.getDay = function() {return this.date.getDay();}
    this.getDayStr = function(){ return this.days[getDay()];}
    this.getDayOfTheMonth = function(){return this.date.getDate();}
    this.getMonth = function(){return this.date.getMonth();}
    this.getMonthStr = function(){return months[this.date.getMonth()];}
    this.getYear = function(){return this.date.getYear() +1900;}
    
    
    this.setDate = function(d){
	if (d==null) {
	    return null;
	}
	this.date = null;
	this.date = d;
	return d;
    }
    
    this.backMonth = function(){
	var m = this.getMonth();
        var year = this.getYear();
        var last_m;
        if ( m == 0 ) {
            last_m = 11;
            year--;
        }
        else last_m = m-1;
        
        var day = 1;
	this.date = null;
	this.date = new Date(year, last_m, day);
        this.fill();
	return d;
    }
    
    this.forwardMonth = function(){
	var m = this.getMonth();
        var year = this.getYear();
        var next_m;
        if ( m == 11 ) {
            next_m = 0;
            year++;
        }
        else next_m = m+1;
        
        var day = 1;
	this.date = null;
	this.date = new Date(year, next_m, day);
        this.fill();
	return d;
    }
    
    this.getDateFromID = function(id){
	var new_array = id.split("_");

	var month = new_array[2]
	var this_year = this.getYear();

	
	return new Date(this_year, month, new_array[1]);
    }
    
    this.setTitleDateByID = function(id){
	var dateFromID = this.getDateFromID(id);
	var selected_day = dateFromID.getDay();
	if ( !sundayFirst ) {
	    if(selected_day == 0) {
		selected_day = 6;
	    }
	    else selected_day -= 1;
	}
	document.getElementById("day_title").innerHTML = days[selected_day] + " " + dateFromID.getDate() + " " + months[dateFromID.getMonth()];
	

    }
    
    return this;
};