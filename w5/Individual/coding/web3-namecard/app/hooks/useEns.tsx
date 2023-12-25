import { usePublicClient, useEnsName, useAccount } from "wagmi";
import { useEffect, useState } from "react";

const useEns = (_address?: string, _ensName?: string) => {
  const { address } = useAccount();
  const addr = _address || address;
  const [retEnsData, setRetEnsData] = useState({});
  const publicClient = usePublicClient();

  const { data, isError, isLoading } = useEnsName({
    address: addr as `0x${string}`,
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    // console.log(data, _ensName);
    // if (_ensName || addr) {
    //   setEnsData(_ensName || data);
    // }
    if (_ensName) {
      setEnsData(_ensName);
    } else if (addr) {
      data ? setEnsData(data.toString()) : setEnsData("");
    }
  }, [_ensName, addr]);
  useEffect(() => {
    if (data) {
      setEnsData(data.toString());
    }
  }, [data]);

  async function setEnsData(ensName: string) {
    const resolverAddress = await publicClient.getEnsResolver({
      name: ensName,
    });
    if (!resolverAddress) {
      setRetEnsData({});
      return;
    }

    const email = await publicClient.getEnsText({
      name: ensName,
      key: "email",
    });
    const twitter = await publicClient.getEnsText({
      name: ensName,
      key: "com.twitter",
    });
    const github = await publicClient.getEnsText({
      name: ensName,
      key: "com.github",
    });
    const discord = await publicClient.getEnsText({
      name: ensName,
      key: "com.discord",
    });
    const websiteUrl = await publicClient.getEnsText({
      name: ensName,
      key: "url",
    });
    const ethAddress = await publicClient.getEnsAddress({ name: ensName });
    const avatarUrl = await publicClient.getEnsAvatar({ name: ensName });

    // const email = await resolver.getText("email");
    // const twitter = await resolver.getText("com.twitter");
    // const github = await resolver.getText("com.github");
    // const discord = await resolver.getText("com.discord");
    // const websiteUrl = await resolver.getText("url");
    // const ethAddress = await publicClient.resolveName(ensName);
    // const avatar = await resolver.getAvatar();
    // const avatarUrl = avatar?.url;
    setRetEnsData({
      email,
      ethAddress,
      twitter,
      github,
      discord,
      ensName,
      avatarUrl,
      websiteUrl,
    });
  }

  return retEnsData;
};

export default useEns;
