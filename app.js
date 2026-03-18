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
    let usedques; 
    let usedarr = [];

    opt1.style.display = 'none';
    opt2.style.display = 'none';
    opt3.style.display = 'none';
    restart.style.display = 'none';
    question.style.display = 'none';
   

  
    //Questions Objects
    let q1 = {
        question : "What is the rarest blood type among humans globally?",
        ans : "AB-Negative",
        option1 : "O-Negative",
        option2 : "O-Positive"
    }
    let q2 = {
        question :"What is the name of the phenomenon where light bends around a massive object in space, such as a galaxy or black hole?",
        ans : "Gravitational Lensing",
        option1 : "Blueshift",
        option2 : "Dopler Effect"
    }
    let q3 = {
        question :"Which element has the highest melting point of any pure metal",
        ans : "Tungsten",
        option1 : "Titanium",
        option2 : "Platinum"
    }
    let q4 = {
        question :"Which Part of the brain controls Hunger",
        ans : "Hypothalamus",
        option1 : "Amygdala",
        option2 : "Hypocampus"  
    }
    let q5 = {
        question :"An old person finds it difficult to read a newspaper without glasses.What defect of vision do he have, and which lens can helps him?",
        ans : "Myopia; Concave lens",
        option1 : "Myopia; Convex lens",
        option2 : "Hypermetropia; Concave lens"
    }
    
    let q6 = {
    question: "Which gas is responsible for the greenhouse effect and is most abundantly produced by human activities?",
    ans: "Carbon Dioxide (CO₂)",
    option1: "Methane (CH₄)",
    option2: "Nitrogen (N₂)"
}

let q7 = {
    question: "A person donates blood and is accepted by any blood group recipient. What is their blood type, and why?",
    ans: "O negative; It has no antigens, making it a universal donor",
    option1: "AB positive; It has all antigens present",
    option2: "O positive; It has the Rh factor which is most common"
}

let q8 = {
    question: "Which planet in our solar system has the most moons, and approximately how many does it have?",
    ans: "Saturn; 146 moons",
    option1: "Jupiter; 146 moons",
    option2: "Uranus; 98 moons"
}

let q9 = {
    question: "A country has more deaths than births over several decades. What social phenomenon is this called?",
    ans: "Population Decline (Negative Population Growth)",
    option1: "Demographic Transition",
    option2: "Urbanization Crisis"
}

let q10 = {
    question: "Which organelle is known as the powerhouse of the cell and produces energy in the form of ATP?",
    ans: "Mitochondria",
    option1: "Nucleus",
    option2: "Ribosome"
}

let q11 = {
    question: "Light travels from water into air and bends away from the normal. What optical phenomenon is this?",
    ans: "Refraction; because light moves from a denser to a rarer medium",
    option1: "Reflection; because the surface acts as a mirror",
    option2: "Diffraction; because light spreads around the water surface"
}

let q12 = {
    question: "A society where a small group holds all political and economic power with no public participation is called what?",
    ans: "Oligarchy",
    option1: "Democracy",
    option2: "Theocracy"
}

let q13 = {
    question: "What is the process by which plants lose water through their leaves called, and what drives it?",
    ans: "Transpiration; driven by heat and low humidity",
    option1: "Osmosis; driven by water concentration difference",
    option2: "Photosynthesis; driven by sunlight and CO₂"
}

let q14 = {
    question: "A metal rod expands when heated and contracts when cooled. What property of matter does this demonstrate?",
    ans: "Thermal Expansion; particles gain energy and move further apart",
    option1: "Elasticity; the rod returns to its original shape after force",
    option2: "Conductivity; heat transfers through the metal particles"
}

let q15 = {
    question: "Which social scientist is considered the father of sociology and coined the term 'sociology' itself?",
    ans: "Auguste Comte",
    option1: "Émile Durkheim",
    option2: "Max Weber"
}

    let questions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15];
    

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
     answer = finques.ans;
    
//Options Logic
    let options =[finques.ans,finques.option1,finques.option2];
   
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
                // element.style.transform ='scale(1.03)'
                greet.innerText = 'Great! You Got it 🎉';      
    }
    else {
        // element.style.backgroundColor = 'lightcoral';
        element.classList.add('wrong');
        element.style.transform ='scale(1.03)';   
        loss++;
        optiontxt.forEach(element=>{
        element.style.pointerEvents = 'none';
            if(element.innerHTML==answer){
                // element.style.backgroundColor = 'lightgreen';  
                element.classList.add('correct');
            }
        })
             greet.innerText = 'Oh No! Wrong Answer 💀';
        } 
            newQues();      
        },)
    });

//Next Button Logic
   function newQues(){
    if(count == 15){
        setTimeout(result,1500);
    }
    else{
     setTimeout(quizLogic,1500);}
    }

//Result Button Logic 
    function result(){
    question.innerText = "You Got : "+win+"/15 Correct";
    opt1.style.display = 'none';
    opt2.style.display = 'none';
    opt3.style.display = 'none'; 
    restart.style.display = 'block';

    perct = win*100/usedarr.length;
    loss = usedarr.length -win;

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
    }}

restart.addEventListener('click',()=>{
    count = 0; win = 0; loss = 0; perct = 0;
    questions.push(...usedarr);
    usedarr =[];
    console.log(usedarr);
    quizLogic();
})