/* -----------------------------------------------------------------------------------
                 ~~~ GET DATES FUNCTION~~~
Exported object with properties and methods to get and calculate dates and times.
-------------------------------------------------------------------------------------*/

const dates = {
  now: new Date(),

  // Get the current year
  get currentYear() {
    return this.now.getFullYear();
  },

  // Get the first day of the current year
  get firstDayOfYear() {
    return new Date(this.currentYear, 0, 1);
  },

  // Calculate the current week number
  get currentWeekNumber() {
    const firstDay = this.firstDayOfYear;
    const dayOfYear = Math.floor((this.now - firstDay) / (1000 * 60 * 60 * 24)) + 1;
    const firstWeekDay = (firstDay.getDay() + 6) % 7; // Monday = 0
    const adjustedDayOfYear = dayOfYear + firstWeekDay - 1;
    const weekNumber = Math.ceil(adjustedDayOfYear / 7);

    // console.log("Date:", this.now);
    // console.log("First day of the year:", firstDay);
    // console.log("Day of the year:", dayOfYear);
    // console.log("Weekday for the first day of the year:", firstWeekDay);
    // console.log("Adjusted day number in the year:", adjustedDayOfYear);
    // console.log("Calculated week number:", weekNumber);

    return weekNumber;
  },

  // Check if the current week is an even week
  get isEvenWeek() {
    const isEven = this.currentWeekNumber % 2 === 0;
    // console.log("Even week:", isEven);
    return isEven;
  },

  // Get the current day of the week (0 = Sunday, 1 = Monday, ... 6 = Saturday)
  get currentDay() {
    return this.now.getDay();
  },

  // Get the current hour
  get currentHour() {
    return this.now.getHours();
  },

  // Get the current month (0 = January, 1 = February, ... 11 = December)
  get currentMonth() {
    return this.now.getMonth();
  },

  // Get the current date (day of the month)
  get currentDate() {
    return this.now.getDate();
  },

  // Check if today is the weekend (Saturday or Sunday)
  get isWeekend() {
    const isWeekend = this.currentDay === 6 || this.currentDay === 0;
    // console.log("Weekend:", isWeekend);
    return isWeekend;
  },

  // Check if today is Monday
  get isMonday() {
    return this.currentDay === 1;
  },

  // Check if today is Tuesday
  get isTuesday() {
    return this.currentDay === 2;
  },

  // Check if today is Friday
  get isFriday() {
    return this.currentDay === 5;
  },

  // Weekend criteria (Friday after 3 PM to Monday 3 AM)
  get weekendCriteria() {
    const isWeekendCriteria =
      (this.isFriday && this.currentHour >= 15) || this.isWeekend || (this.isMonday && this.currentHour <= 3);
    // console.log("Weekend criteria met:", isWeekendCriteria);
    return isWeekendCriteria;
  },

  // Monday discount criteria (up to 10:00 AM)
  get mondayDiscountCriteria() {
    const isMondayDiscount = this.isMonday && this.currentHour <= 10;
    // console.log("Monday discount criteria met:", isMondayDiscount);
    return isMondayDiscount;
  },

  // Tuesday discount criteria (even week and Tuesday)
  get tuesdayDiscountCriteria() {
    const isTuesdayDiscount = this.isTuesday && this.isEvenWeek;
    // console.log("Tuesday discount criteria met:", isTuesdayDiscount);
    return isTuesdayDiscount;
  },

  // Night delivery criteria (any day after 11 PM and before 6 AM)
  get nightDeliveryCriteria() {
    const isNightDelivery = this.currentHour >= 23 || this.currentHour < 6;
    // console.log("Night delivery criteria met:", isNightDelivery);
    return isNightDelivery;
  },

  // Meeting delivery criteria (Fridays between 11 AM and 1 PM)
  get meetingDeliveryCriteria() {
    const isMeetingDelivery = this.isFriday && this.currentHour >= 11 && this.currentHour <= 13;
    // console.log("Meeting delivery criteria met:", isMeetingDelivery);
    return isMeetingDelivery;
  },

  // Weekend delivery criteria (Saturday or Sunday)
  get weekendDeliveryCriteria() {
    const isWeekendDelivery = this.isWeekend;
    // console.log("Weekend delivery criteria met:", isWeekendDelivery);
    return isWeekendDelivery;
  },

  // Check if it is Lucia (December 13th)
  get isLucia() {
    const isLucia = this.currentMonth === 11 && this.currentDate === 13; // 11 = December
    // console.log("Is it Lucia?", isLucia);
    return isLucia;
  },

  // Check if it is Christmas Eve (December 24th)
  get isChristmas() {
    const isChristmas = this.currentMonth === 11 && this.currentDate === 24; // 11 = December
    // console.log("Is it Christmas Eve?", isChristmas);
    return isChristmas;
  },

  // Simulate a specific date
  simulateDate(newDate) {
    this.now = new Date(newDate);
    // console.log(`Simulated date: ${this.now}`);
  },
};

export default dates;

/** Test functionality
 * 
 * dates.simulateDate("2024-12-13");
 *  console.log("Is it Lucia?", dates.isLucia); // true
 * 
 * dates.simulateDate("2024-12-24");
 * console.log("Is it Christmas Eve?", dates.isChristmas); // true
 * 
 * dates.simulateDate("2024-12-10");
 * console.log("Is it Lucia?", dates.isLucia); // false
 * console.log("Is it Christmas Eve?", dates.isChristmas); // false
 * 
 */

