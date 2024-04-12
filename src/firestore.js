import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'; 

class Poll {
    constructor(pollId, pollCode, anonymous){
        this.pollId = pollId;
        this.pollCode = pollCode;
        this.anonymous = anonymous;
        this.votes = [];
        this.results = [];
        this.pollOptions = [];
        this.open = true;
    }
}

class UserVotes {
    constructor(pollOption, rank, name){
        this.pollOption = pollOption;
        this.rank = rank;
        this.name = name;
        this.voterId = crypto.randomUUID();
    }   
}

const pollConverter = {
    toFirestore: (poll) =>{
        return {
            pollId: poll.pollId,
            pollCode: poll.pollCode,
            anonymous: poll.anonymous,
            votes: poll.votes,
            results: poll.results,
            pollOptions: poll.pollOptions,
            open: poll.open
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Poll(data.pollId, data.pollCode, data.anonymous, data.votes, data.results, data.pollOptions, data.open)
    }
}

export async function createPoll(){
    let uuid = crypto.randomUUID();
    let pollShortCode = '';
    for(let i = 0; i<4; i++){
        pollShortCode += String.fromCharCode(Math.random()*(90-65)+65);
    }
    const poll = new Poll(uuid, pollShortCode, true, [],[], []);

    const ref = doc(db, "polls", pollShortCode).withConverter(pollConverter);
    await setDoc(ref, poll);
}

export async function getPollOptions(pollShortCode){
    //get list of options
    const ref = doc(db, "polls", pollShortCode);
    const docSnap = await getDoc(ref);
    if(docSnap.exists()){
        const poll = docSnap.data();
        // console.log(docSnap.data());
        return poll.pollOptions;
    } else{
        console.log("Oh no, there's no document")
    }
}

export async function uploadPollOptions(pollShortCode, newOptions){
    const ref = doc(db, "polls", pollShortCode);
    const oldOptions = await getPollOptions(pollShortCode);
    await updateDoc(ref, {
        "pollOptions": oldOptions.concat(newOptions)
    })
}

async function getVotes(pollShortCode){
    const ref = doc(db, "polls", pollShortCode);
    const docSnap = await getDoc(ref);
    if(docSnap.exists()){
        const poll = docSnap.data();
        // console.log(docSnap.data());
        return poll.votes;
    } else{
        console.log("Oh no, there's no document")
    }
}

export async function uploadVotes(pollShortCode, newVotes){
    if(isPollOpen(pollShortCode)){
        const ref = doc(db, "polls", pollShortCode);
        const oldVotes = await getVotes(pollShortCode);
        await updateDoc( ref, {
            "votes": oldVotes.concat(newVotes)
        })
    } else{
        console.log("Poll closed");
    }

}

export async function isPollOpen(pollShortCode){
    console.log("hello truth");
    const ref = doc(db, "polls", pollShortCode);
    const isOpen = onSnapshot(ref, (doc) => {
        // console.log(doc.data());
    });
    console.log('isOpen');
    return isOpen;
}

export async function closePolls(pollShortCode){
    const ref = doc(db, "polls", pollShortCode);
    const docSnap = await getDoc(ref);
    if(docSnap.exists()){
        await updateDoc(ref, {
            "open": false
        })
        // console.log("hello lc")
    } else{
        console.log("Oh no, there's no document")
    }
}

export async function getPollResults(pollShortCode){
    const votes = await getVotes(pollShortCode);
    //sort the votes based off the rank, create a new list
    //iterate through the votes for the best, if nothing achieves 50%
    //then go to the worst performer and transfer all of their votes
    //repeat
    //if there is no winner, then we find
    votes.sort((a,b) => (a.rank - b.rank))
    let m = new Map();
    let i = 0;
    let round = 1;
    votes[i].rank = 2;
    while(votes[i].rank==round){
        const pollOption = votes[i].pollOption;
        let voteCount = m.get(pollOption);
        voteCount ??= 0;
        m.set(pollOption, voteCount+1);
        i++;
    }
    let minKey = "";
    let minValue = Number.MAX_SAFE_INTEGER;

    for(let [key, value] of m){
        if(value<minValue){
            minValue = value;
            minKey = key;
        }
    }

    while(votes[i].rank==round){}

    
    //check to see if there is a winner
    //if there is a winner, we're done
    //if there is no winner, we iterate through the result so far and find the worst
    //convert map to array

}
