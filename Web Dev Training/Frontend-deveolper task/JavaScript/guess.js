const max = prompt(" enter the maximum number ");
const random=Math.floor(Math.random()*max)+1;
let guess=prompt("Enter the guess number");
while(true)
    {
    if(guess=="quit")
        {
        console.log("You Quit the Game");
        break;
    }
   else if(guess==random)
    {
      console.log("You Won the Game");
      break;
   }
   else
    guess=prompt("Enter the number again ");
}