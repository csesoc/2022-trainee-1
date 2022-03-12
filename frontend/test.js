const today = new Date();

const activities = [
    { title: 'Hiking', date: new Date('2019-06-28') },
    { title: 'Shopping', date: new Date('2019-06-10') },
    { title: 'Trekking', date: new Date('2019-06-22') }
  ]

const sortedActivities = activities.slice().sort((a, b) => a.date - b.date)

console.log(sortedActivities);
// console.log(typeof(today));
// const month = today.getDate();
// console.log(today.getDate())

// console.log(typeof(today.getDate()))

// const todayDate = `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()}`
// console.log(todayDate)
// console.log(typeof(todayDate))