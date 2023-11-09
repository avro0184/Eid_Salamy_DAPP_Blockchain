import { useState , useEffect} from 'react'
import { ethers } from 'ethers'
import "../src/assets/App.css"
import map from "../src/assets/map.png"
import email from "../src/assets/gmail.png"
import phone from "../src/assets/smartphone.png"
import { Link } from 'react-router-dom'
import abi from "../../artifacts/contracts/EidSalamy.sol/EidSalamy.json"
import { Web3Provider } from '@ethersproject/providers';

function App() {
  const [state, setState] = useState({
    provider : null,
    signer : null, 
    contract : null
  })
  const [account , setAccount ] = useState("")
  useEffect(()=>{
    const template =async () =>{
      const contractAddress = "0x334670aef4f9307CA7cffc814004572f32eD0165"
      const contractAbi = abi.abi 
      const {ethereum} = window
      const account = await ethereum.request({
        method : "eth_requestAccounts"
      })
      setAccount(account)
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        contractAddress ,
         contractAbi , 
         signer
      )
      setState({provider , signer, contract})
    }
     template()
  },[])

  const SubmitForm = async (event) =>{
    event.preventDefault();
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var integer = document.getElementById('integerInput').value;
    const valueInEther = ethers.utils.parseEther(integer);
    const {contract }= state
    const transection = await contract.PayMoney(name , description ,valueInEther)
    await transection.wait
    console.log(transection)

  }

  return (
    <>
      <section id="contact" className="contact font-monospace ">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                        <p style={{ fontSize: "40px", textAlign: "center" }}>Contact Us</p>
                    </div>

                    <div className="row mt-5">

                        <div className="col-lg-4">
                            {/* <div className="info" style={{ padding: "20px" }} >
                                <div className="address">
                                    <Link to="https://goo.gl/maps/YB3s1ye7sqnk2ae18" target="_blank"><i className="bi bi-phone"><img src={map} alt="" style={{ height: "30px" }} /></i></Link>

                                    <h4>Location:</h4>
                                    <p>Rajgonj, comilla, Bangladesh</p>
                                </div>

                                <div className="email">
                                    <Link to="mailto:jahidji0188@gmail.com"><i className="bi bi-phone"><img src={email} alt="" style={{ height: "30px" }} /></i></Link>
                                    <h4>Email:</h4>
                                    <Link to="mailto:jahidji0188@gmail.com" style={{ color: "black", marginLeft: "10px", textDecoration: "none" }}>jahidji0188@gmail.com</Link>
                                </div>

                                <div className="phone" style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Link to="tel:+8801884689484"><i className="bi bi-phone"><img src={phone} alt="" style={{ height: "30px" }} /></i></Link>
                                    <h4>Call:</h4>
                                    <Link to="tel:+8801884689484" style={{ color: "black", marginLeft: "10px", textDecoration: "none" }}><span>+880-1884689484</span></Link>
                                </div>

                            </div> */}

                        </div>

                        <div className="col-lg-8 mt-5 mt-lg-0" id="contact-form-section">

                            <form action="" onSubmit={SubmitForm} method="post" className="php-email-form" style={{ padding: "20px" }}>
                                <div className="row">
                                    <div className="col-md-9 form-group">
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                    </div>
                                    <div className="col-md-3 form-group">
                                        <input type="number" id="integerInput" name="integerInput" step=".1" min="0.1" className="form-control"  placeholder="Ether Amount" required />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <textarea className="form-control" name="description" id='description' rows="5" placeholder="Message" required></textarea>
                                </div>

                                <div className="text-center">
                                    <button type="submit">Send Ether</button>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>
            </section>
            
    </>
  )
}

export default App
