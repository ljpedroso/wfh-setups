import Hero from "../components/Hero";
import Setups from "../components/Setups";

export default function Index({ list }) {
  return (
    <div>
      <Hero />
      <Setups list={list} />
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/setups");
  const list = await res.json();

  return {
    props: {
      list,
    },
  };
}
