import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function index() {
  const router = useRouter();

  async function addNewMeetup(data) {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);

      return router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Add meetup spot</title>
        <meta
          name="Description"
          content="Add a meetup spot to hang out with friends"
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addNewMeetup} />
    </>
  );
}

export default index;
