let question = document.getElementById('question');
    let opt1 = document.getElementById('opt1');
    let opt2 = document.getElementById('opt2');
    let opt3 = document.getElementById('opt3');
    let greet = document.getElementById('greet');
    let optiontxt = document.querySelectorAll('.options');
    let start = document.getElementById('start');
    let restart = document.getElementById('restart');
    let count = 0;
    let win = 0;
    let answer = "";
    let loss =0; let perct=0;
    let usedques; let lengthofques=0;
    let usedarr = [];

    opt1.style.display = 'none';
    opt2.style.display = 'none';
    opt3.style.display = 'none';
    restart.style.display = 'none';
    question.style.display = 'none';
   
    //Getting Random Questions Function
     let questions = [];
        let url = "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple";
        let getdata = async ()=>{
        start.style.pointerEvents = 'none';
        let data = await fetch(url);
        console.log(data);
        let finaldata = await data.json();
        questions = finaldata.results;
        lengthofques = questions.length;
        quizLogic();
    }
    
    function quizLogic(){
//Default styles 
    question.style.display = 'block';
    start.style.display = 'none';
    restart.style.display = 'none';
    
// Count Check
    count++;
    
    for(let opt of optiontxt){
        opt.style='none';
        opt.classList.remove('correct');
        opt.classList.remove('wrong');
        opt.innerText = '';
    }
        greet.innerText='';
// Question Logic
    let finquesindex = Math.floor(Math.random()*questions.length);
    let finques = questions[finquesindex];
    question.innerText=`${count}, ${finques.question}`;
     answer = finques.correct_answer;
    
//Options Logic
    let options =[finques.correct_answer,finques.incorrect_answers[0],finques.incorrect_answers[1]];
   
    for(let opt of optiontxt){
    let finopt = Math.floor(Math.random()*options.length);
    let addopt = options.splice(finopt,1);
    opt.innerText = addopt;
    }
    usedques = questions.splice(finquesindex,1);
    usedarr.push(...usedques);   
}

//Answer Checking 
    optiontxt.forEach(element => {
        element.addEventListener('click',()=>{
           
    if(element.innerHTML===answer){
            element.classList.add('correct');
            win++;
            element.style.transform ='scale(1.03)';
            greet.innerText = 'Great! You Got it 🎉'; 
            for(let opt of optiontxt){
            opt.style.pointerEvents = 'none';
        } ;
    }
    else {
        // element.style.backgroundColor = 'lightcoral';
        element.classList.add('wrong');
        element.style.transform ='scale(1.03)';   
        loss++;
        optiontxt.forEach(element=>{
            if(element.innerHTML==answer){
            // element.style.backgroundColor = 'lightgreen';  
            element.classList.add('correct');
            }
        })
            greet.innerText = 'Oh No! Wrong Answer 💀';
            for(let opt of optiontxt){
            opt.style.pointerEvents = 'none';
            };
        } 
            newQues();      
        },)
    });

//Next Button Logic
   function newQues(){
    if(count == lengthofques){
        setTimeout(result,1500);
    }
    else{
     setTimeout(quizLogic,1500);}
    }

//Result Button Logic 
    function result(){
    question.innerText = "You Got : "+win+"/"+lengthofques+" Correct";
    opt1.style.display = 'none';
    opt2.style.display = 'none';
    opt3.style.display = 'none'; 
    restart.style.display = 'block';

    perct = win*100/usedarr.length;
    loss = usedarr.length -win;

//Follow Up Message
    if(win==0){
        greet.innerText = "0 Correct Oh No 🏳️, It's Okay Give It Another Try 👍";
    }
    else if(perct==100){
        greet.innerText = "All Correct? You Are Definetly a Genius 👑";
    }
    else if(perct>=60){
        greet.innerText = " Only "+loss+" Miss Boy You Did a Great Job 👏";
    }
    else{
        greet.innerText = loss+" Incorrect Hmm 🤔, Good Effort Needs a Little Improvement";
    }
}

//Restart Game Logic
restart.addEventListener('click',()=>{
    count = 0; win = 0; loss = 0; perct = 0;
    questions.push(...usedarr);
    usedarr =[];
    console.log(usedarr);
    getdata();
    restart.style.pointerEvents = 'none';
})