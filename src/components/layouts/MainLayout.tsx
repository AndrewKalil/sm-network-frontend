import Head from "next/head";
import { PropsWithChildren } from "react";

import { Navbar } from "../ui";

interface IProps {
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const MainLayout = ({ children, title }: PropsWithChildren<IProps>) => {
  return (
    <div className="h-screen w-full flex flex-col">
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Andrew Kalil" />
        <meta
          name="description"
          content={`informacion sobre pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta
          property="og:title"
          content={`informacion sobre pokemon ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre ${title}`}
        />
        <meta
          property="og:image"
          content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png"
        />
        <meta
          name="description"
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      <Navbar />
      <main className="px-5 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
