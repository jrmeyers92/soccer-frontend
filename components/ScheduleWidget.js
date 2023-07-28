import { useContext, useEffect, useState } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import { sortByDateAsc, sortByDateDesc } from "../lib/sortArrayByDate";
import ScheduleWidgetResultListItem from "./ScheduleWidgetResultListItem";
import ScheduleWidgetScheduleTypes from "./ScheduleWidgetScheduleTypes";
import SectionHeading from "./SectionHeading";
import WidgetFooterLink from "./WidgetFooterLink";

const ScheduleWidget = () => {
  const [siteState, setSiteState] = useContext(SiteStateContext);
  const [scheduleData, setScheduleData] = useState([]);
  const [noSchedule, setNoSchedule] = useState(true);
  const [scheduleType, setScheduleType] = useState("upcoming");
  const [year, setYear] = useState();

  let url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/schedules?populate=*&filters[team][$eq]=${siteState.team}&filters[gender][$eq]=${siteState.gender}&sort[0]=year%3Adesc&pagination[pageSize]=1`;

  const changeScheduleType = (value) => {
    setScheduleType(value);
  };

  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data?.data[0]) {
  //         let date = new Date();
  //         date = date.toISOString();
  //         let shownSchedule;
  //         if (scheduleType === "upcoming") {
  //           shownSchedule = data.data[0].attributes.game.filter(
  //             (item) => item.date > date
  //           );
  //           shownSchedule = sortByDateAsc(shownSchedule);
  //         } else if (scheduleType === "results") {
  //           shownSchedule = data.data[0].attributes.game.filter(
  //             (item) => item.date < date
  //           );
  //           shownSchedule = sortByDateDesc(shownSchedule);
  //         }

  //         if (shownSchedule.length > 0) {
  //           setScheduleData(shownSchedule);
  //           setYear(data.data[0].attributes.year);
  //           setNoSchedule("");
  //         } else {
  //           if (scheduleType === "upcoming") {
  //             setNoSchedule("No upcoming games at this time");
  //           } else {
  //             setNoSchedule("No results at this time");
  //           }
  //         }
  //       } else {
  //         if (scheduleType === "upcoming") {
  //           setNoSchedule("No upcoming games at this time");
  //         } else {
  //           setNoSchedule("No results at this time");
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       setNoSchedule("");
  //       throw err;
  //     });
  // }, [siteState, scheduleType]);

  return (
    <div className="w-full md:w-1/3 my-2 bg-white shadow-md">
      {!noSchedule && (
        <SectionHeading
          title={`${year} ${siteState.gender} ${siteState.team} schedule`}
        />
      )}

      {noSchedule && (
        <SectionHeading
          title={`${siteState.gender} ${siteState.team} schedule`}
        />
      )}

      <ScheduleWidgetScheduleTypes
        clicked={changeScheduleType}
        scheduleType={scheduleType}
      />

      {noSchedule && <p className="p-2">{noSchedule}</p>}

      {!noSchedule && (
        <ul>
          {scheduleData.map((game) => (
            <ScheduleWidgetResultListItem
              key={game.id}
              opponentSchool={game.opponent.data.attributes.school_name}
              opponentMascot={game.opponent.data.attributes.mascot}
              opponentScore={game.opponentScore}
              ourScore={game.ourScore}
              date={game.date}
              time={game.time}
              location={game.location}
              scheduleType={scheduleType}
            />
          ))}
        </ul>
      )}

      <WidgetFooterLink
        text="view full schedule"
        theLink={`/schedule/${siteState.gender}/${siteState.team}`}
      />
    </div>
  );
};

export default ScheduleWidget;
