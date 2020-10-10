var app = angular.module('dashboard', ['ngCookies']);
app.controller('dashboardCtrl', function($scope, $http, $cookies) {

    !$cookies.get("username") ? window.location.href = "index.html" : ''


var d = new Date();

var Calendar = {
  themonth : d.getMonth(), // The number of the month 0-11
  theyear : d.getFullYear(), // This year
  today : [d.getFullYear(),d.getMonth(),d.getDate()], // adds today style
  selectedDate : null, // set to today in init()
  years : [], // populated with last 10 years in init()
  months : ['January','February','March','April','May','June','July','August','September','October','November','December'],

  init: function(){
    this.selectedDate = this.today
    // Populate the list of years in the month/year pulldown
    var year = this.theyear;
    for (var i=0; i<10; i++) {
      this.years.push(year--);
    }
    
    this.bindUIActions();
    this.render();
  },

  bindUIActions: function() {
    // Create Years list and add to ympicker
    for (var i=0;i<this.years.length;i++)
      $('<li>'+this.years[i]+'</li>').appendTo('.calendar-ympicker-years');
    this.selectMonth(); this.selectYear(); // Add active class to current month n year

    // Slide down year month picker
    $('.monthname').click(function(){
      $('.calendar-ympicker').css('transform','translateY(0)');
    });

    // Close year month picker without action
    $('.close').click(function(){
      $('.calendar-ympicker').css('transform','translateY(-100%)');
    });

    // Move calander to today
    $('.today').click(function(){
      Calendar.themonth = d.getMonth(); 
      Calendar.theyear = d.getFullYear();
      Calendar.selectMonth(); Calendar.selectYear();
      Calendar.selectedDate = Calendar.today;
      Calendar.render();
      $('.calendar-ympicker').css('transform','translateY(-100%)');
    });

    // Click handlers for ympicker list items
    $('.calendar-ympicker-months li').click(function(){        
      Calendar.themonth = $('.calendar-ympicker-months li').index($(this));
      Calendar.selectMonth();
      Calendar.render();
      $('.calendar-ympicker').css('transform','translateY(-100%)');
    });
    $('.calendar-ympicker-years li').click(function(){         
      Calendar.theyear = parseInt($(this).text());
      Calendar.selectYear();
      Calendar.render();
      $('.calendar-ympicker').css('transform','translateY(-100%)');
    });

    // Move the calendar pages
    $('.minusmonth').click(function(){
      Calendar.themonth += -1;
      Calendar.changeMonth();
    });
    $('.addmonth').click(function(){
      Calendar.themonth += 1;
      Calendar.changeMonth();
    });
  },

  // Adds class="active" to the selected month/year
  selectMonth : function(){
    $('.calendar-ympicker-months li').removeClass('active');
    $('.calendar-ympicker-months li:nth-child('+(this.themonth+1)+')').addClass('active');
  },
  selectYear : function(){
    $('.calendar-ympicker-years li').removeClass('active');
    $('.calendar-ympicker-years li:nth-child('+(this.years.indexOf(this.theyear)+1)+')').addClass('active');
  },

  // Makes sure that month rolls over years correctly
  changeMonth: function(){
    if(this.themonth == 12){
        this.themonth = 0;
        this.theyear++;
        this.selectYear();
      }
    else if(this.themonth == -1){
      this.themonth = 11;
      this.theyear--;
      this.selectYear();
    }
    this.selectMonth();
    this.render();
  },

  // Helper functions for time calculations
  TimeCalc : {
    firstDay : function(month,year) {
      var fday = new Date(year,month,1).getDay(); // Mon 1 ... Sat 6, Sun 0
      if (fday === 0) fday = 7;
      return fday -1; // Mon 0 ... Sat 5, Sun 6
    },
    numDays : function(month,year) {
      return new Date(year,month+1,0).getDate(); // Day 0 is the last day in the previous month
    }
  },

  render : function(){
    var days = this.TimeCalc.numDays(this.themonth, this.theyear), // get number of days in the month
      fDay = this.TimeCalc.firstDay(this.themonth, this.theyear), // find what day of the week the 1st lands on        
      daysHTML = '', i;

    $('.calendar p.monthname').text(this.months[this.themonth]+'  '+this.theyear); // add month name and year to calendar
    for (i=0; i<fDay; i++) { // place the first day of the month in the correct position
      daysHTML += '<li class="noclick">&nbsp;</li>';
    }
    // write out the days
    for (i=1; i<=days; i++) { 
      if(this.today[0] == this.selectedDate[0] && 
        this.today[1] == this.selectedDate[1] && 
        this.today[2] == this.selectedDate[2] &&
        this.today[0] == this.theyear && 
        this.today[1] == this.themonth && 
        this.today[2] == i)
        daysHTML += '<li class="active today">'+i+'</li>';
      else if(this.today[0] == this.theyear && 
        this.today[1] == this.themonth && 
        this.today[2] == i)
        daysHTML += '<li class="today">'+i+'</li>';
      else if(this.selectedDate[0] == this.theyear && 
        this.selectedDate[1] == this.themonth && 
        this.selectedDate[2] == i)
        daysHTML += '<li class="active">'+i+'</li>';
      else
        daysHTML += '<li>'+i+'</li>';

      $('.calendar-body').html(daysHTML); // Only one append call
    }
    
    // Adds active class to date when clicked
    $('.calendar-body li').click(function(){ // toggle selected dates
      if(!$(this).hasClass('noclick')){
        $('.calendar-body li').removeClass('active');
        $(this).addClass('active');
        Calendar.selectedDate = [Calendar.theyear, Calendar.themonth, $(this).text()]; // save date for reselecting
      }
    });
  }
};

    Calendar.init();
    
    /* Setting current time + fix for inactive tab */

var radius = 6;

$(document).ready(function() {
	for(var i=0; i<60; i++)
		$('.clock__marks').append('<li></li>');
  
	var currentTime = new Date();
	var second = currentTime.getSeconds() * radius;
	var minute = currentTime.getMinutes() * radius + Math.floor(second / (radius * 10) * 10) / 10;
	var hour = currentTime.getHours() * radius * 5 + Math.floor(minute / (radius * 2) * 10) / 10;
  
	setClockHands(second, minute, hour);
});


function setClockHands(second, minute, hour){
	var secondElm = $('.clock__hand--second');
	var minuteElm = $('.clock__hand--minute');
	var hourElm = $('.clock__hand--hour');
  
	secondElm.css('transform', 'rotate(' + second + 'deg)');
	minuteElm.css('transform', 'rotate(' + minute + 'deg)');
	hourElm.css('transform', 'rotate(' + hour + 'deg)');
  
	var interval = 1000; //1 second
	var before = new Date();
  
	setInterval(function(){
		var now = new Date();
		var elapsedTime = now.getTime() - before.getTime(); //Fix calculating in inactive tabs
		var delay = Math.round(elapsedTime/interval);
    
		second += radius * delay;
		for(var i=0; i<delay; i++){
			if( ((second - i) * radius) % (radius * 5) === 0 ){
				minute += 0.5;
				if( minute % radius === 0 ){
					hour += 0.5;
				}
			}
		}
    
		secondElm.css('transform', 'rotate(' + second + 'deg)');
		minuteElm.css('transform', 'rotate(' + minute + 'deg)');
		hourElm.css('transform', 'rotate(' + hour + 'deg)');
    
		before = new Date();
	}, interval);
}

})