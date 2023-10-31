import { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers';

const web3Modal = new Web3Modal({
    network: "rinkeby",
    // network: "sepolia",
    providerOptions: {}
})

const useWeb3 = () => {
    const [provider, setProvider] = useState(null)
    useEffect(() => {
        const init = async () => {
            const instance = await web3Modal.connect();
            const _provider = new ethers.BrowserProvider(instance)
            setProvider(_provider)
        }
        init()
    }, [])
    return provider
}

export default useWeb3