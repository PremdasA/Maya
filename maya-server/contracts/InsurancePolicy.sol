pragma solidity ^0.4.10;
contract Ownable {
    address owner;
    function() public 
    {
        //Set owner to who creates the contract
        owner = msg.sender;
    }
    //Access modifier 
    modifier Owned 
    {
        require(msg.sender == owner,"Not the owner");
        _;
    }
}
contract Mortal is Ownable {
    //Our access modifier is present, only the contract creator can      use this function
    function kill() public Owned 
    { 
        selfdestruct(owner);
    }
}

contract InsurancePolicy is Mortal{
    uint fee;
    uint Seelerid; //in %
    string InsuranceType;
    
    event PolicyAccepted(bool _status, uint _sellerId, string _insuranceType);

    function InsurancePolicy(uint _fee, uint _sellerId) payable public
    {
        require(_fee > 0);
        require(_sellerId > 0);
        fee = _fee;
        Seelerid = _sellerId;
    }
 
    function CreatePolicy(uint _minFee,string _insuranceType) payable public 
    {
        if (fee > _minFee) 
        {
            emit PolicyAccepted(true, Seelerid ,_insuranceType);
        } 
        else 
        {
            emit PolicyAccepted(false, Seelerid, _insuranceType);
        }
    }
 
    function() public 
    { //fallback
        revert();
    }
}