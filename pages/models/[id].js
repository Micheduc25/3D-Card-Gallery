export async function getServerSideProps({ params }) {
  return {
    redirect: {
      permanent: true,
      destination: `/?model_id=${params.id}`,
    },
  };
}
export default function ID(props) {
  return (
    <>
      <div></div>
    </>
  );
}
