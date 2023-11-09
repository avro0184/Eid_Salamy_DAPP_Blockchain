// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract EidSalamy {
   
   address payable public owner;

   constructor(){
    owner = payable (msg .sender);
   }

   struct PaymentMoney{
    address from;
    string name;
    string message ;
    uint256 timestamps;
   }

   PaymentMoney[] moneylist;

  function PayMoney(string memory _name , string memory _message ) public payable  {
   require(msg.value >0 , "You have unsufficient Balance");
   owner.transfer(msg.value);
   moneylist.push(PaymentMoney(msg.sender , _name , _message , block.timestamp));
  }

  function MoneyList() public  view  returns (PaymentMoney[] memory){
    return moneylist;
  }

}