const prompt = require("prompt-sync")();


const ROWS =3;
const COLS = 3;

const SYMBOLS_COUNT={
    A:3,
    B:4,
    C:5,
    D:5
};
const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
};


const deposit = ()=>{
    while (true){
    const depAmount=prompt("Enter the deposit amount: ");
    const DepAmount = parseFloat(depAmount);
    if(isNaN(DepAmount)||DepAmount<=0){
        console.log("invalid Amount pls enter again");
    }else{
        return DepAmount;
     } }
};
const getnumberoflines = ()=>{
    while(true){
    const numberoflines = prompt("Enter the lines you want to bet on(1-3): ");
    const numberofbet = parseFloat(numberoflines);
    if(isNaN(numberofbet)|| numberofbet<0 || numberofbet>3){
         console.log("invalid bet lines,pls enter again")
    }else{
        return numberofbet;
    }}
 };

const numberbet =(balance,lines)=>{
    while (true){
    const getbet =prompt("Enter the bet amount: ");
    const realbet = parseFloat(getbet);
    if(isNaN(realbet)|| realbet<=0|| realbet>balance/lines){
        console.log("inavild bet amount! enter again")
    }else{
        return realbet;
     } }
};

const spin=()=>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i<count; i++){
            symbols.push(symbol)
        }
    };
    const reels=[[],[],[]];
    for(let i=0;i<COLS;i++){
        const reelSymbol = [...symbols];
    
    for(let j = 0;j<ROWS;j++){
    const randomIndex = Math.floor(Math.random()*reelSymbol.length)
    const selectedSymbol=reelSymbol[randomIndex];
    reels[i].push(selectedSymbol);
    reelSymbol.splice(randomIndex,1)
}
    }return reels;
} ;

const trasnpose = (reel)=>{
     const row = [];
     for(let i = 0;i<ROWS;i++){
        row.push([])
        for(let j =0;j<COLS;j++){
            row[i].push(reel[j][i])
        }
     } return row
};

const printrows = (rows)=>{
    for(const row of rows){
        let rowstring = "";
        for(const[i,symbol]of row.entries()){
            rowstring+=symbol;
            if(i!=rows.length-1){
                rowstring+= " | "
            };
        }console.log(rowstring)
        
    }
};

const getwinnings = (rows,lines,bet)=>{
    let winnings = 0;
    for( let row = 0;row<lines;row++){
        const symbols = rows[row]
        let allsame =true;
        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allsame=false;
                break;
            }
        }if(allsame){
            winnings+=bet*SYMBOLS_VALUES[symbols[0]]
        }
    } return winnings;
    
}

const game =() =>{
let balance= deposit();
while (true){
    console.log("your balance is $: " +balance)
const numberBetLines = getnumberoflines();
const GetBet = numberbet(balance,numberBetLines)
balance-=GetBet;
const reel = spin()
const rowss = trasnpose(reel)
printrows(rowss)
const winnings = getwinnings(rowss,numberBetLines,GetBet);
balance+=winnings
console.log("You won $: "+winnings);
const playagain = prompt("Do you want to play again: y/N")
if(playagain!="y"){
    break;
}
}
}

game()

