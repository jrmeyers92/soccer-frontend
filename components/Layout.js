import Head from "next/head";
import LogoAtTopOfPages from "./LogoAtTopOfPages.js";
import MobileNav from "./MobileNav.js";
import Nav from "./Nav.js";

const styles = {
  container: "px-2 md:px-4 lg:px-8 xl:px-12 bg-slate-200 min-h-screen",
};

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Glendale Soccer</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <LogoAtTopOfPages />
    <Nav />
    <MobileNav />

    <main>
      <div className={styles.container}>{children}</div>
    </main>
  </>
);
export default Layout;
