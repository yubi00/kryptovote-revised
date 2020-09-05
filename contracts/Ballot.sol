// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.7.0;


contract Ballot {

	//Information about a voter
	struct Voter {
		uint weight; //weight is amount of vote the voter can have
		bool voted; //true implies voter already voted
		uint vote; //index of the voted candidate
	}

	//Candidate type for a single candidate

	struct Candidate {
		bytes32 name; // name up to 32 bytes
		uint voteCount; // total number of votes
		bytes32 partyName;
		string partySymbol;
	}

	bytes32 electionName;
	address payable admin;
	uint votingdeadline;

	/*
	 *This is a special type of func called modifier which is used to restrict the execution of certain transaction, where the admin only have the rights to do so
	 *
	 */
	modifier onlyAdmin() {
		if (msg.sender != admin)
			return;
		_;
	}

	/*
	 *only admin can change the ownership of the contract
	 * @param {address} newAdmin
	 * address of the admin 
	 *
	 */
	

	/*
	 * This function is used set the voting time limit , the duration set by the admin will be added to the current time 
	 * @param {uint} duration
	 * duration of the voting period
	 *
	 */
	function setVotingDeadline(uint duration) public {
		votingdeadline = block.timestamp + (duration * 1 minutes);
	}

	/*
	 *This getter function is used to get the voting deadline, where we have set using the setVotingDeadline() 
	 *
	 */
	function getVotingDeadline() public view returns(uint) {
		return votingdeadline;
	}

	/*
	 *This function is used to make sure that users are not allowed to vote after the voting period ends which will return false
	 *
	 */
	function checkVotingStatus() public view returns(bool) {
		if (block.timestamp > votingdeadline) {
			return false;
		}
		else {
			return true;
		}
	}
	/*
	 *This function is used to make sure that users are not allowed to vote after the voting period ends which will return false
	 *
	 */
	//This function is used make sure that the users are not not allowed to  result unless the voting ends
	function isAllowed() public view returns(bool) {
		if (block.timestamp < votingdeadline) {
			return true;
		}
		else {
			return false;
		}
	}

	//Mapping is used to store the voters detail on the basis of their address
	mapping(address => Voter) public voters;

	//Dynamnically-sized array of 'Candidate' structs
	Candidate[] public candidates;

	/*
	 *This function creates a new election which requires two arguements electionname and voting duration
	 * @param {bytes32} election
	 * name of the election
	 *@param {uint} duration
	 *
	 */
	function createElection(bytes32 election, uint duration) public  {
		require( block.timestamp != votingdeadline );
		electionName = election;
		votingdeadline = block.timestamp + (duration * 1 minutes);
	}

	/*
	 *This function is used to retrieve the election  from the blockchain which returs a string . a helper func called bytes32ToString is used here to convert bytes32 to string 
	 *@return {string} elecName
	 * name of an election
	 */
	function getElectionName() public view  returns(string memory elecName) {
		elecName = bytes32ToString(electionName);
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
	 *This function is used to add candidatename to the blockchain
	 *@return {bytes32} Name
	 * name of a candidate
	 */
	function addCandidateName(string memory candidateName) public pure returns(bytes32 Name) {
		Name = stringToBytes32(candidateName);
		return Name;
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
	 *This function is used to retrieve the candidate name as a bytes32
	 *@param {uint} index
	 *index of the candidate
	 *@return {bytes32} candid
	 *candidate by bytes
	 */
	function getCandidateBytes(uint index) public view  returns(bytes32 candid) {
		candid = candidates[index].name;
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
	 *Admin only gives 'voter' right to vote on the ballot
	 *@param {address} voter
	 *address of the voter
	 *
	 */
	function giveRightToVote(address voter) public onlyAdmin {
		if (msg.sender != admin || voters[voter].voted) {
			return;
		}
		voters[voter].weight = 1;
	}

	/*
	 *his function adds voters to the blockchain and Admin only have the rights to add the voters
	 * @param {address} voter
	 * address of the voter 
	 *
	 */
	function addVoter(address voter) public onlyAdmin {
		Voter storage v = voters[voter];
		if (v.voted) {
			return;
		}
		v.weight = 1;
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
	function vote(bytes32 candidateName) public  returns(bool check) {
		Voter storage sender = voters[msg.sender];
		if (sender.voted) {
			return true;
		}
		else {
			sender.voted = true;
			sender.weight = 1;

			for (uint i = 0; i < candidates.length; i++) {
				if (candidates[i].name == candidateName) {
					candidates[i].voteCount += sender.weight;
				}
			}
			return false;
		}
	}

	/*
	 *This function checks if two strings are equal. Note, Solidity handles bytes32 and string as a different data type 
	 * @param {string} _a
	 * first string
	 * @param {string} _b
	 * second string
	 *@return {bool}
	 *boolean value
	 */
	function stringsEqual(string  storage _a, string memory _b) internal view returns(bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;

		for (uint i = 0; i < a.length; i++) {
			if (a[i] != b[i])
				return false;
		}
		return true;
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
	 *this function returns the total number of committed votes of each candidate, provided their name 
	 * @param {bytes32} candidate
	 * name of the candidate in bytes32
	 *@return {uint}
	 *total number of votes for each candidate
	 */

	function totalVotesFor(bytes32 candidate) public view  returns(uint) {
		for (uint i = 0; i < candidates.length; i++) {
			if (candidates[i].name == candidate) {
				return getCandidateVoteCount(i);
			}
		}
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

	/*
	 *This function kills the contract and the remaining funds of the contract is recovered back to the admin
	 *
	 */
	function kill() public {
		if (msg.sender == admin) {
			selfdestruct(admin);
		}
	}

	/*
	 *  This is a fallback function, which rejects any ether sent to it.It is good Ballotpractise to include such a function for every contract
	 * in order not to loose Ether.  
	 *@return {}
	 */

	 fallback() external {
		return;
	}
}