import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import styles from "../styles/MobileNav.module.scss";
import OptionsSelect from "./OptionsSelect";

const MobileNav = () => {
  const router = useRouter();
  const [siteState, setSiteState] = useContext(SiteStateContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className={styles.mobileNav}>
      <OptionsSelect
        name="teamSelect"
        options={["Girls JV", "Girls Varsity", "Boy's JV", "Boy's Varsity"]}
        defaultSelectOption="Choose a Team"
      />
      <div className={styles.checkboxBurgerWrapper}>
        <input
          type="checkbox"
          name="hamburgerCheckBox"
          id="hamburgerCheckBox"
        />
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul className={styles.list}>
        <li>
          <Link href="/news">
            <a
              className={`${router.pathname == "/news" ? styles.active : ""} ${
                styles.link
              }`}
            >
              News
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/schedule/${siteState.gender}/${siteState.team}`}>
            <a
              className={`${
                router.asPath ==
                `/schedule/${siteState.gender}/${siteState.team}`
                  ? styles.active
                  : ""
              } ${styles.link}`}
            >
              Schedule
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/roster/${siteState.gender}/${siteState.team}`}>
            <a
              className={`${
                router.asPath == `/roster/${siteState.gender}/${siteState.team}`
                  ? styles.active
                  : ""
              } ${styles.link}`}
            >
              Roster
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/stats/${siteState.gender}/${siteState.team}`}>
            <a
              className={`${
                router.asPath == `/stats/${siteState.gender}/${siteState.team}`
                  ? styles.active
                  : ""
              } ${styles.link}`}
            >
              Stats
            </a>
          </Link>
        </li>
        <li>
          <Link href="/coaches">
            <a
              className={`${
                router.pathname == "/coaches" ? styles.active : ""
              } ${styles.link}`}
            >
              Coaches
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
