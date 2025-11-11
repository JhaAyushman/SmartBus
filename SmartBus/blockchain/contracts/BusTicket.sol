// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BusTicket {
    address public owner;
    uint256 public ticketCounter = 0;
    
    struct Ticket {
        uint256 ticketId;
        address buyer;
        uint256 amount;
        string busRoute;
        string seatNumbers;
        uint256 purchaseTime;
        bool isValid;
    }
    
    mapping(uint256 => Ticket) public tickets;
    mapping(address => uint256[]) public userTickets;
    
    event TicketPurchased(
        uint256 indexed ticketId,
        address indexed buyer,
        uint256 amount,
        string busRoute,
        string seatNumbers,
        uint256 timestamp
    );
    
    constructor() {
        owner = msg.sender;
    }
    
    function purchaseTicket(string memory _busRoute, string memory _seatNumbers) 
        public 
        payable 
        returns (uint256) 
    {
        require(msg.value > 0, "Payment required");
        
        uint256 newTicketId = ticketCounter;
        ticketCounter++;
        
        tickets[newTicketId] = Ticket({
            ticketId: newTicketId,
            buyer: msg.sender,
            amount: msg.value,
            busRoute: _busRoute,
            seatNumbers: _seatNumbers,
            purchaseTime: block.timestamp,
            isValid: true
        });
        
        userTickets[msg.sender].push(newTicketId);
        
        emit TicketPurchased(newTicketId, msg.sender, msg.value, _busRoute, _seatNumbers, block.timestamp);
        
        return newTicketId;
    }
    
    function getTicket(uint256 _ticketId) public view returns (Ticket memory) {
        require(_ticketId < ticketCounter, "Invalid ticket");
        return tickets[_ticketId];
    }
    
    function getUserTickets(address _user) public view returns (uint256[] memory) {
        return userTickets[_user];
    }
}