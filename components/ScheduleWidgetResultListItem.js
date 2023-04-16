import Image from "next/image";
import { formatTime } from "../lib/dateFormatter.js";
import Logo from "../public/images/Logo.png";
import OponentLogo from "../public/images/kickapooLogo.png";
const ScheduleWidgetResultListItem = ({
  opponentSchool,
  opponentMascot,
  ourScore,
  opponentScore,
  date,
  time,
  location,
  scheduleType,
}) => {
  const formattedDate = new Date(date)
    .toDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\S+)\s+(\S+\s+\S+)/, "$1, $2,");

  return (
    <li className="border-b border-gray-300 last:mb-0 last:border-b-0 p-4 border-l border-r">
      <div className="uppercase font-extralight mb-2">
        {formattedDate}{" "}
        {scheduleType === "results" ? "• Final" : "• " + formatTime(time)}
      </div>
      <div className="flex items-center">
        <Image src={Logo} height={35} width={35} alt="Glendale Logo" />
        <span
          className={`ml-2 ${
            ourScore > opponentScore ? "font-bold" : "font-extralight"
          }`}
        >
          Glendale
        </span>
        <span
          className={`ml-auto mr-8  ${
            ourScore > opponentScore ? "font-bold" : "font-light"
          }`}
        >
          {ourScore}
        </span>
      </div>

      <div className="flex items-center w-full">
        <Image src={OponentLogo} height={35} width={35} alt="Opponent Logo" />
        <span
          className={`ml-2 ${
            opponentScore > ourScore ? "font-bold" : "font-light"
          }`}
        >
          {location === "Home" ? "vs " : "at "}
          {opponentSchool} {opponentMascot}
        </span>
        <span
          className={`ml-auto mr-8 ${
            opponentScore > ourScore ? "font-bold" : "font-light"
          }`}
        >
          {opponentScore}
        </span>
      </div>
    </li>
  );
};

export default ScheduleWidgetResultListItem;
