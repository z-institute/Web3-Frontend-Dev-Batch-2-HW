import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const ContractBalance = dynamic(() => import("../components/ContractBalance"), {
  ssr: false,
});
const SendMessage = dynamic(() => import("../components/SendMessage"), {
  ssr: false,
});
const MessageList = dynamic(() => import("../components/MessageList"), {
  ssr: false,
});

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div>
      <Head>
        <title>Jack&apos;s Message Board</title>
        <meta content="Jack's on-chain message board" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="dark:bg-slate-800 dark:text-gray-200 flex flex-col min-h-screen">
        <main className="max-w-3xl w-full mx-auto flex-1 px-2">
          <h1 className="text-3xl font-bold text-center md:pt-20 pb-2">
            Jack&apos;s Message Board
          </h1>
          <div className="flex justify-center p-2">
            <ConnectButton showBalance />
          </div>
          <div className="p-2 text-center">
            <ContractBalance />
          </div>
          <div className="p-2">{isConnected && <SendMessage />}</div>
          <div className="p-2 border border-white border-dotted">
            <h2 className="text-xl font-bold text-center pb-2">
              Promoted messages
            </h2>
            <MessageList paid />
          </div>
          <div className="p-2">
            <MessageList />
          </div>
        </main>

        <footer className="p-4">
          Made with ❤️ by your frens at Z Institute
        </footer>
      </div>
    </div>
  );
};

export default Home;
