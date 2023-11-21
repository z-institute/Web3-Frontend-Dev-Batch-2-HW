'use client';

import {useEffect, useState} from 'react';
import {useContractRead, useContractReads} from 'wagmi';
import {contractABI} from '../lib/contractABI';
import {Abi} from 'viem';
import {Button} from './ui/button';
import Image from 'next/image';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';
import {AspectRatio} from '@radix-ui/react-aspect-ratio';

type NFTMetaDataProps = {
  attributes: {
    trait_type: string;
    value: string;
  }[];
  description: string;
  image: string;
  name: string;
};

const ContractData = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [nftMetaDataList, setNftMetaDataList] = useState<NFTMetaDataProps[]>([]);
  const [contractName, setContractName] = useState('Loading...');

  const itemsPerPage = 10;

  const {data: totalSupply} = useContractRead({
    address: '0xade5473Ea5A8d6ceE2f637cCf0B6D91bF9f40BFd',
    abi: contractABI as Abi,
    functionName: 'totalSupply',
  });

  const {data: name} = useContractRead({
    address: '0xade5473Ea5A8d6ceE2f637cCf0B6D91bF9f40BFd',
    abi: contractABI as Abi,
    functionName: 'name',
  });

  useEffect(() => {
    // 只在客戶端執行
    if (name) {
      setContractName(name as unknown as string);
    }
  }, [name]);

  const totalPages = totalSupply ? Math.ceil(Number(totalSupply) / itemsPerPage) : 0;

  const tokenIds = Array.from({length: itemsPerPage}, (_, i) => currentPage * itemsPerPage + i);

  const {
    data: nftData,
    isError,
    isLoading,
  } = useContractReads({
    contracts: tokenIds.map((tokenId) => ({
      address: '0xade5473Ea5A8d6ceE2f637cCf0B6D91bF9f40BFd',
      abi: contractABI as Abi,
      functionName: 'tokenURI',
      args: [tokenId],
    })),
  });

  useEffect(() => {
    if (nftData) {
      const fetchNFTMetaData = async () => {
        try {
          const nftDataList = nftData.filter((uri) => uri.result);
          const nftList = nftDataList.map((uri, index) => {
            const tokenID = currentPage * itemsPerPage + index;
            return fetch(uri.result as unknown as string)
              .then((res) => res.json())
              .catch((err) => console.error('Error fetching NFT metadata:', err));
          });
          const metaData = await Promise.all(nftList);
          setNftMetaDataList(metaData.filter((data) => data)); // Filter out undefined values
        } catch (error) {
          console.error('Error in fetching NFT metadata:', error);
        }
      };

      fetchNFTMetaData();
    }
  }, [currentPage, nftData]);

  const changePage = (offset: number) => {
    setCurrentPage((prev) => Math.max(0, Math.min(totalPages - 1, prev + offset)));
  };

  return (
    <div className="container flex flex-col gap-6">
      <h1 className="flex gap-2 py-4 text-4xl border-b border-gray-200">
        Welcome to {contractName}!
      </h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data</p>}
      <div className="grid grid-cols-5 gap-6">
        {nftMetaDataList.map((data, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="mb-4">{data.name}</CardTitle>
              <CardDescription>{data.description}</CardDescription>
            </CardHeader>
            <AspectRatio ratio={5 / 4}>
              <Image src={data.image} fill objectFit="cover" alt={data.name} />
            </AspectRatio>
            <CardContent className="p-4">
              <div className="space-y-2">
                {data.attributes.map((attribute, idx) => (
                  <p className="flex justify-between w-full" key={idx}>
                    <span className="inline-block text-sm">{attribute.trait_type}</span>
                    <span className="inline-block font-semibold">{attribute.value}</span>
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between gap-6 p-4 border-t border-gray-200">
        <Button
          className="flex-auto"
          type="button"
          onClick={() => changePage(-1)}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          className="flex-auto"
          type="button"
          onClick={() => changePage(1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContractData;
