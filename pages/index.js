import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { MONGO_KEY } from "../key";

async function getMeetupps() {
  const client = await MongoClient.connect(MONGO_KEY);
  const db = client.db();
  try {
    const meetupsCollection = db.collection("meetupCol");
    const meetups = await meetupsCollection.find().toArray();

    return meetups;
  } catch (error) {
    console.log(error);
  }

  return client.close();
}

function index(props) {
  return (
    <>
      <Head>
        <title>Meet Up</title>
        <meta
          name="Description"
          content="Select a meetup spot to hang out with friends"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // You could add logic that fetches data
  const meetups = await getMeetupps();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    }, // stores the data
    revalidate: 10, // Indicates intervals(in seconds) for re-generating data
  };
} // To pre render data that'd be loaded from another source.
// use-effect would also work but won't be as effective
// would re-render data before the page loads initially i.e. before the function runs
// The name is reserved. i.e. you always have to name it getStaticProps

/*export async function getServerSideProps(context) {
  // get data
  const req = context.req; // Server side pre-rendering gives access to the req and res obj.
  const res = context.res;
  return {}; // return object ususally doesnt contain revailidate. JUST PROPS.
} */

// Use getServerSideProps only if data changes very frequentl;y.
export default index;
