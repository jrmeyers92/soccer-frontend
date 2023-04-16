import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { SiteStateContext } from "../context/SiteStateContext";
import styles from "../styles/OptionsSelect.module.css";

const OptionsSelect = ({ name, options, defaultSelectOption, onSelect }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [siteState, setSiteState] = useContext(SiteStateContext);
  const router = useRouter();

  useEffect(() => {
    if (siteState) {
      setCurrentValue(`${siteState.gender} ${siteState.team}`);
      const pathArray = router.pathname.split("/");
      const genderIndex = pathArray.indexOf("[gender]");
      const teamIndex = pathArray.indexOf("[team]");
      pathArray[genderIndex] = siteState.gender;
      pathArray[teamIndex] = siteState.team;
      const pathString = pathArray.join("/");
      router.push(pathString);
    }
  }, [siteState]);

  const optionClicked = (e) => {
    setCurrentValue(e.target.innerHTML);
    setOptionsOpen(false);
    let context = e.target.innerHTML;
    let contextArray = context.split(" ");
    let gender = contextArray[0].replace("'", "");
    let team = contextArray[1];

    localStorage.setItem("team", team);
    localStorage.setItem("gender", gender);

    setSiteState({
      team: team,
      gender: gender,
    });
  };

  const listItems = options.map((option) => (
    <li
      key={option}
      className={`flex items-center justify-between ${
        currentValue == option ? "pointer-events-none text-primary-500" : ""
      }`}
    >
      <button onClick={optionClicked} className="w-full text-left">
        {option}
      </button>
      <span>{option == currentValue ? <BsCheck /> : ""}</span>
    </li>
  ));

  return (
    <div className={styles.optionSelect}>
      <label
        htmlFor={name}
        className={`shimmer ${styles.label}`}
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        <span>{currentValue ? currentValue : defaultSelectOption}</span>
        {optionsOpen ? (
          <FiChevronUp size="1rem" />
        ) : (
          <FiChevronDown size="1rem" />
        )}
      </label>
      <input type="checkbox" name={name} id={name} hidden />

      <ul className={`${styles.list} ${optionsOpen ? "block" : "hidden"} `}>
        {listItems}
      </ul>
    </div>
  );
};

export default OptionsSelect;
