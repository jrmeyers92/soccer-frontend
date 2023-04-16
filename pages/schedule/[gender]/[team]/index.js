import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Layout from "../../../../components/Layout";
import { SiteStateContext } from "../../../../context/SiteStateContext";
import { fetcher } from "../../../../lib/api";

const schedule = ({ schedule }) => {
  const [siteState, setSiteState] = useContext(SiteStateContext);

  const router = useRouter();

  if (!schedule.data[0]) {
    return (
      <Layout>
        <section className="text-center py-8">
          <h1 className="text-2xl pt-6 py-4">{`${siteState.gender} ${siteState.team} Schedule`}</h1>
          <p>Sorry, there is no schedule available at this time.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-4xl text-center py-6">
        {schedule.data[0].attributes.year} {siteState.gender} {siteState.team}{" "}
        Schedule
      </h1>
    </Layout>
  );
};

export default schedule;

export async function getServerSideProps(context) {
  let url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/schedules?populate=*&filters[team][$eq]=${context.query.team}&filters[gender][$eq]=${context.query.gender}&sort[0]=year%3Adesc&pagination[pageSize]=1`;

  const schedule = await fetcher(url);

  return {
    props: {
      schedule,
    },
  };
}
