// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.7.0;


contract Ballot {

	//Information about a voter
	struct Voter {
		uint weight; //weight is amount of vote the voter can have
		bool voted; //true implies voter already voted
	}

	//Candidate type for a single candidate

	struct Candidate {
		bytes32 name; // name up to 32 bytes
		uint voteCount; // total number of votes
		bytes32 partyName;
		string partySymbol;
	}

	bytes32 electionName;
	bytes32 electionDesc;
	address public admin;
	uint votingdeadline;

	constructor() {
		admin = msg.sender;
	}

	/*
	 *This is a special type of func called modifier which is used to restrict the execution of certain transaction, where the admin only have the rights to do so
	 *
	 */
	modifier onlyAdmin() {
		require(msg.sender == admin);
		_;
	}

	
	//Mapping is used to store the voters detail on the basis of their address
	mapping(address => Voter) public voters;
	address[] voterIndex;

	//Dynamnically-sized array of 'Candidate' structs
	Candidate[] public candidates;

	/*
	 *This function creates a new election which requires two arguements electionname and voting duration
	 * @param {bytes32} election
	 * name of the election
	 *@param {uint} duration
	 *
	 */
	function createElection(bytes32 election, bytes32 desc, uint duration) public  {
		delete candidates;
		deleteAllVoters();
		delete voterIndex;
		electionName = election;
		votingdeadline = block.timestamp + (duration * 1 minutes);
		electionDesc = desc;
	}

	/*
	 *This function is used to retrieve the election  from the blockchain which returs a string . a helper func called bytes32ToString is used here to convert bytes32 to string 
	 *@return {string} elecName
	 * name of an election
	 */
	function getElectionName() public view  returns(string memory elecName) {
		elecName = bytes32ToString(electionName);
	}
	
	function getElectionDesc() public view returns(string memory elecDesc) {
		elecDesc = bytes32ToString(electionDesc);
	}

	/*
	 *This getter function is used to get the voting deadline,
	 *
	 */
	function getVotingDeadline() public view returns(uint) {
		return votingdeadline;
	}

	/*
	 *This is a helper function which is used to convert the given bytes32 to string which is later required when we want to retrieve the output as a string 
	 *@param {bytes32} x
	 * any bytes32 character
	 *@return {string}
	 */
	function bytes32ToString(bytes32 x) public pure returns(string memory) {
		bytes memory bytesString = new bytes(32);
		uint charCount = 0;
		for (uint j = 0; j < 32; j++) {
			byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
			if (char != 0) {
				bytesString[charCount] = char;
				charCount++;
			}
		}
		bytes memory bytesStringTrimmed = new bytes(charCount);
		for (uint j = 0; j < charCount; j++) {
			bytesStringTrimmed[j] = bytesString[j];
		}
		return string(bytesStringTrimmed);
	}

	/*
	 *This is a helper function which converts string to bytes32
	 *@param {string memory} source
	 *string data type 
	 *@return {bytes32} result
	 *result in bytes32
	 */
	function stringToBytes32(string memory source) public pure returns(bytes32 result) {
		assembly {
			result := mload(add(source, 32))
		}
	}

	/*
	 *This function is used to add candidates to the blockchin, which requires three arguements such as candidatename, partyname and party symbol image
	 *@param {bytes32} candid
	 *name of the candidate
	 *@param {bytes32} symbol
	 *symbol of an image
	 *@param {bytes32} party
	 *party name
	 *@return {bytes32} c
	 *a new Candidate object
	 */
	function addCandidate(bytes32 candidateName, bytes32 partyName, string memory symbol) public  {
		candidates.push(Candidate({
			name: candidateName,
			partyName: partyName,
			partySymbol: symbol,
			voteCount: 0
		}));
	}

	/*
	 *This function returns a number of candidates added to the blockchain
	 *@return {uint256} length
	 *the number of candidates added to the blockchain
	 */
	function getCandidateLength() public view  returns(uint256 length) {
		length = candidates.length;
	}

	/*
	 *This function retrieves the name of the candidate , provided the index of a candidate and is converted to string
	 *@param {uint} index
	 *index of the candidate
	 *@return {string} candid
	 * name of the candidate
	 */
	function getCandidate(uint index) public view  returns(string memory candid) {
		candid = bytes32ToString(candidates[index].name);

	}
	/*
	 *This function is retrieves the candidate party name from the blockchain and is converted to string
	 *@param {uint} index
	 *index of the candidate
	 *@return {string} party
	 *party name
	 */
	function getCandidatePartyName(uint index) public view  returns(string memory party) {
		party = bytes32ToString(candidates[index].partyName);

	}

	/*
	 *This function is retrieves the candidate party symbol from the blockchain and is converted to string
	 *@param {uint} index
	 *index of the candidate
	 *@return {string} symb
	 *party symbol image
	 */
	function getCandidatePartySymbol(uint index) public view  returns(string memory symb) {
		symb = candidates[index].partySymbol;

	}

	/*
	 *This function is used to retrieve the candidate details
	 *@param {uint} index
	 *index of the candidate
	 *@return {string} candid
	 *candidate name
	 *@return {string} symb
	 *symbol image
	 */
	function getCandidateDetails(uint index) public view returns(string memory candidate, string memory partyName,  string memory  symb) {
		candidate = bytes32ToString(candidates[index].name);
		partyName = bytes32ToString(candidates[index].partyName);
		symb = candidates[index].partySymbol;

	}

	/*
	 *Admin only gives 'voter' right to vote on the ballot
	 *@param {address} voter
	 *address of the voter
	 *
	 */
	function giveRightToVote(address voter) public onlyAdmin {
		require(msg.sender == admin);
		require(!voters[voter].voted);

		voters[voter].weight = 1;
	}

	/*
	 *his function adds voters to the blockchain and Admin only have the rights to add the voters
	 * @param {address} voter
	 * address of the voter 
	 *
	 */
	function addVoter(address voter) public  {
		bool exist = voterExist(voter); 
		if(!exist) {
			voterIndex.push(voter);
		}
	}

	function voterExist(address voter) public view returns(bool) {
		for(uint i=0; i< voterIndex.length; i++) {
			if(voterIndex[i] == voter){
				return true;
			}
		}
		return false;
	}

	function deleteAllVoters() public   {
		for(uint i=0; i<voterIndex.length; i++) {
			if(voterExist(voterIndex[i])) {
				delete voters[voterIndex[i]];
			}
		}
	}

	function getVoter(uint index) public view returns (address) {
		return voterIndex[index];
	}

	function getVotersLength() public view returns(uint votersLength) {
		votersLength = voterIndex.length;
	}

	/*
	 *This function checks if candidate already exist
	 * @param {bytes32} candidate
	 * candidate name in bytes32
	 *@return {bool}
	 *a boolean value
	 */
	function validCandidate(bytes32 candidate) public view returns(bool) {
		for (uint i = 0; i < candidates.length; i++) {
			if (candidates[i].name == candidate) {
				return true;
			}
		}
		return false;
	}

	/*
	 *This function is used to commit vote to their preferred candidate 
	 * @param {bytes32} candidateName
	 * candidate name
	 *@return {bool} check
	 *boolean value
	 */
	function vote(bytes32 candidateName) public {
		Voter storage sender = voters[msg.sender];
		
		require(block.timestamp < votingdeadline, 'voting period ended already');
		require(!sender.voted);

		sender.voted = true;
		sender.weight = 1;

		for (uint i = 0; i < candidates.length; i++) {
			if (candidates[i].name == candidateName) {
				candidates[i].voteCount += sender.weight;
			}
		}
		addVoter(msg.sender);
			
	}


	/*
	 *This function gets the number of vote count of each candidate on the basis of their index
	 *@param {uint} index
	 *index of the candidate
	 *@return {uint} voteCount
	 *the number of commited vote of each candidate
	 */
	function getCandidateVoteCount(uint index) public view  returns(uint voteCount) {
		return candidates[index].voteCount;
	}

	/*
	/*This function retrieves the total numbers of committed votes to all the candidates
	*@return {uint} count
	*toal number of accumulated votes of all the candidates
	*/
	function getTotalVotes() public view  returns(uint count) {
		count = 0;
		for (uint i = 0; i < candidates.length; i++) {
			count += candidates[i].voteCount;
		}
	}

	/*
	 *This function returns true if voters has already voted to make sure that the voters are not allowed to vote twice
	 *@param {address} voter
	 *address of the voter
	 *@return {bool} voted
	 *boolean value
	 */
	function getVoted(address voter) public view returns(bool voted) {
		if (voters[voter].voted == true) {
			return true;
		}
		return false;
	}

	/*
	 *Automatic calculation of winning candidate with all votes of the voters
	 * @return {uint} winningCandidate
	 * the highest number of votes
	 *
	 */

	function winningCandidate() public view  returns(uint winner) {
		uint winningVoteCount = 0;
		for (uint i = 0; i < candidates.length; i++) {
			if (candidates[i].voteCount > winningVoteCount) {
				winningVoteCount = candidates[i].voteCount;
				winner = i;
			}
		}
	}
	/*
	 *This is a readonly function which returns the name of the winnner candidate
	 *@return {string} winnerName
	 *winner name
	 */
	function winnerName() public view  returns(string memory winner) {
		winner = bytes32ToString(candidates[winningCandidate()].name);
	}

	function sendEther(address payable recipient) external {
		recipient.transfer(0.1 ether);
	}

	function balanceOf() external view returns(uint) {
		return address(this).balance;
	}

	receive() external payable {
		if(msg.value < 1000) {
			revert();
		}
	}

}