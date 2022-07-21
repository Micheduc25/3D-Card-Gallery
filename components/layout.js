import Head from "next/head";

import { useState, useEffect } from "react";
export default function Layout({ children }) {
  return (
    <div className="default-layout pt-12 pb-6 ">
      <Head></Head>

      <div className="main-content">{children}</div>

      <style jsx>{`
        .main-content {
        }

        .menu-icon span {
          display: block;
          background-color: white;
          width: 18px;
          height: 2px;
          margin: 0 auto;
        }

        .menu-icon span:nth-child(2) {
          width: 25px;
        }

        .menu-icon span:not(:last-child) {
          margin-bottom: 3px;
        }
      `}</style>
    </div>
  );
}
