import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import useWeb3 from './useWeb3'


const useContract = (address = '0x0', abi) => {
    console.log(address, abi)
    const provider = useWeb3()
    const [contract, setContract] = useState(null)
    useEffect(() => {
        if (!provider) return
        const init = async () => {
            const signer = await provider.getSigner();
            const _contract = new ethers.Contract(address, abi, signer)
            setContract(_contract)
        }
        init()
    }, [provider])

    return contract
}

export default useContract