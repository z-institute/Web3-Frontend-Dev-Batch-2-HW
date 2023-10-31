import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import useWeb3 from "../hooks/useWeb3";

function Example() {
  const provider = useWeb3();
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("0x0");
  const [balance, setBalance] = useState("0");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!provider) return;

    const init = async () => {
      const signer = await provider.getSigner();
      const _address = await signer.getAddress();
      const _balance = await provider.getBalance(_address);

      setBalance(ethers.formatEther(_balance));
      setAddress(_address);
    };
    init();
  }, [provider]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {address ? address : "connect wallet"}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>$ {balance}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;
