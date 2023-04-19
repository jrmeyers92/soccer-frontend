const SchedulePageListItem = ({ item }) => {
  return (
    <li key={item.id}>
      <div>location: {item.location}</div>
      <div>our score: {item.ourScore}</div>
      <div>opponent score: {item.opponentScore}</div>
      <div>opponent school: {item.opponent.data.attributes.school_name}</div>
      <div>opponent mascot: {item.opponent.data.attributes.mascot}</div>
      <div>data: {item.date}</div>
      <div>time: {item.time}</div>
    </li>
  );
};

export default SchedulePageListItem;
