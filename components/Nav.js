import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import OptionsSelect from "./OptionsSelect";

const styles = {
  nav: "hidden md:flex flex-col items-center",
  navWrapper:
    "flex justify-between items-center bg-gray-200 py-2 w-full px-2 lg:px-12",
  list: `py-2 flex`,
  link: `py-2 px-4 text-lg uppercase text-black`,
  active: `font-bold`,
};

export default function Nav() {
  const router = useRouter();
  const [siteState, setSiteState] = useContext(SiteStateContext);

  return (
    <nav className={styles.nav}>
      <div className={styles.navWrapper}>
        <OptionsSelect
          name="teamSelect"
          options={["Girls JV", "Girls Varsity", "Boy's JV", "Boy's Varsity"]}
          defaultSelectOption="Choose a Team"
        />
        <ul className={styles.list}>
          <li>
            <Link href="/news">
              <a
                className={`${
                  router.pathname == "/news" ? styles.active : ""
                } ${styles.link}`}
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
                  router.asPath ==
                  `/roster/${siteState.gender}/${siteState.team}`
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
                  router.asPath ==
                  `/stats/${siteState.gender}/${siteState.team}`
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
      </div>
    </nav>
  );
}
