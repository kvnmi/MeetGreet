import MeetupDetail from "../components/meetups/MeetupDetail";
import { MONGO_KEY } from "../key";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

async function getMeetupIds() {
  const client = await MongoClient.connect(MONGO_KEY);
  const db = client.db();
  try {
    const meetupsCollection = db.collection("meetupCol");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    return meetups;
  } catch (error) {
    console.log(error);
  }

  return client.close();
}

async function getMeetup(meetupId) {
  const client = await MongoClient.connect(MONGO_KEY);
  const db = client.db();
  try {
    const meetupsCollection = db.collection("meetupCol");
    const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    return meetup;
  } catch (error) {
    console.log(error);
  }

  return client.close();
}
function Details(props) {
  return (
    <>
      <Head>
        <title>{props.meetups.title}</title>
        <meta name="Description" content={props.meetups.description}></meta>
      </Head>
      <MeetupDetail
        img={props.meetups.image}
        address={props.meetups.address}
        description={props.meetups.description}
        title={props.meetups.title}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const data = await getMeetup(meetupId);

  console.log(meetupId);

  return {
    props: {
      meetups: {
        id: data._id.toString(),
        title: data.title,
        address: data.address,
        image: data.image,
        description: data.description,
      },
    },
  };
}

export async function getStaticPaths() {
  const meetup = await getMeetupIds();
  return {
    fallback: false,
    paths: meetup.map((i) => ({
      params: { meetupId: i._id.toString() },
    })),
  };
}

export default Details;
