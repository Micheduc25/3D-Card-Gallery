import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="default-layout pt-12 pb-6 ">
      <Head></Head>

      <div className="main-content">{children}</div>

      <style jsx>{``}</style>
    </div>
  );
}
