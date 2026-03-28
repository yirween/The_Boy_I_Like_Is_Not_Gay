// dom
const calendar = document.querySelector('.calendar');
const calendarBody = calendar.querySelector('.calendar-body');

// 获取当前日期 
const year = new Date().getFullYear();
const month = new Date().getMonth();
const date = new Date().getDate();
const day = new Date().getDay();

console.log(`今天是${year}年${month + 1}月${date}日，星期${day}`);

// 获取这个月第一天是星期几
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// 获取这个月有多少天
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

//向日历中添加日期
function renderCalendar(year, month) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // 清空日历
  calendarBody.innerHTML = '';

  // 添加空白占位符
  for (let i = 0; i < firstDay; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    calendarBody.appendChild(dayElement);
  }

  // 顶部年月
  const yearText = document.getElementsByClassName('calendar-year')[0];
  const monthText = document.getElementsByClassName('calendar-month')[0];

  yearText.textContent = year;

  if (month < 9) {
    monthText.textContent = '0' + (month + 1);
  }else{
    monthText.textContent = month + 1;
  }

  // 添加每一天
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    dayElement.textContent = i;
    calendarBody.appendChild(dayElement);
  }
}

renderCalendar(year, month);