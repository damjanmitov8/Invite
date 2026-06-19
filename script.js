const cardImage = document.getElementById("card-image");
const cardTitle = document.getElementById("card-title");
const cardActions = document.getElementById("card-actions");

const noButtonTexts = [
    "Are you sure?",
    "Really?",
    "Please?",
    "You can't escape!",
    "Click YESS :(("
];

let noTextIndex = 0;
let selectedMood = "";
const formspreeEndPoint = "https://formspree.io/f/xnjyeqkp";

function renderCard(title, imageSrc, buttons) {
    cardTitle.innerHTML = title;
    cardImage.src = imageSrc;
    cardActions.innerHTML = "";

    buttons.forEach(function(button) {
        const newButton = document.createElement("button");

        newButton.className = "btn";
        newButton.type = "button";
        newButton.id = button.id;
        newButton.textContent = button.text;
        newButton.addEventListener("click", button.onClick);

        if (button.onMouseOver) {
            newButton.addEventListener("mouseover", button.onMouseOver);
        }

        cardActions.appendChild(newButton);
    });
}

function moveNoButton(event) {
    const noButton = event.target;

    noTextIndex++;

    if (noTextIndex >= noButtonTexts.length) {
        noTextIndex = 0;
    }

    noButton.textContent = noButtonTexts[noTextIndex];
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 220 + "px";
    noButton.style.top = Math.random() * 120 + "px";
}

function showYesAnswer() {
    renderCard(
        'OUU STVARNO "DA"?? ❤️',
        "./Images/223531.gif",
        [
            {
                id: "yes-btn",
                text: "Togasshh NEEXXTT :))))",
                onClick: showNextStep
            }
        ]
    );
}

function showNextStep() {
    renderCard(
        "Vo koj MOOD sme ? 😂",
        "./Images/200.gif",
        [
            {
                id: "pizza-btn",
                text: "Pizza 🍕",
                onClick: function() 
                {
                    selectMood("Pizza");
                }
            },
            {
                id: "burger-btn",
                text: "Burger 🍔",
                onClick: function() 
                {
                    selectMood("Burger");
                }
            },
            {
                id: "pasta-btn",
                text: "Pasta 🍜",
                onClick: function() 
                {
                    selectMood("Pasta");
                }
            },
            {
                id: "blago-btn",
                text: "Blago 🧁",
                onClick: function() 
                {
                    selectMood("Blago");
                }
            },
             {
                id: "alkohol-btn",
                text: "Samo pijacka 🍻",
                onClick: function() 
                {
                    selectMood("Pijacka");
                }
            },
            {
                id: "kola-btn",
                text: "Chill voznja so kola 🛻",
                onClick: function()
                 {
                    selectMood("Kola");
                }
            }

        ]
    );
}

function selectMood(mood)
 {
    selectedMood = mood;
    showDateTimeStep();
}

function showDateTimeStep() 
{
    renderCard(
        "Koga si Free ? 🗓️",
        "./Images/puglie-pug-puglie.gif",
        []
        );

        const DateTimeInput = document.createElement("input");
        DateTimeInput.type = "date"
        DateTimeInput.textContent = "Odberi datum";
        let today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, '0');
        let day = today.getDate().toString().padStart(2, '0');
        let minDate = `${year}-${month}-${day}`;
        DateTimeInput.min = minDate;
        cardActions.appendChild(DateTimeInput)

        const timeSelect = document.createElement("select");
        timeSelect.className = "time-select";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Odberi vreme";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        timeSelect.appendChild(defaultOption);
        
        const options = document.createElement("option");
        options.value = "19:00";
        options.textContent = "19:00 - hm rano e, ama ajde";
        const optionsEight = document.createElement("option");
        optionsEight.value = "20:00";
        optionsEight.textContent = "20:00 - yes , this one";
        const optionsNine = document.createElement("option");
        optionsNine.value = "21:00";
        optionsNine.textContent = "21:00 - vekje nemozam da izdrzam :)";
        timeSelect.appendChild(options);
        timeSelect.appendChild(optionsEight);
        timeSelect.appendChild(optionsNine);
        cardActions.appendChild(timeSelect);



        const confirmButton = document.createElement("button");
        confirmButton.className = "btn";
        confirmButton.type = "button";
        confirmButton.id = "confirm-btn";
        confirmButton.textContent = "Deal";
        confirmButton.addEventListener("click", function()
        {
            if(timeSelect.value === "" || DateTimeInput.value === "")
            {
                alert("Te molam odberi vreme i datum!");
            }
            else
            {   
                const dateInviteData = 
                {
                mood: selectedMood,
                date: DateTimeInput.value,
                time: timeSelect.value,
                status: "deal"
                };

                console.log(dateInviteData);
                sendFormDataToFormspree(dateInviteData);


                showFinalStep(dateInviteData);

            }
        });

        cardActions.classList.add("form-actions");
        cardActions.appendChild(confirmButton);
        
    
}

function showFinalStep(dateInviteData) 
{
    renderCard(
        `Milo mi e sto ne otide exit😊. Te zimam vo ${dateInviteData.time} casot , na isto mesto od prethodniot pat 💛🎉`,
        "./Images/223531.gif",
        [],

    );
}

function sendFormDataToFormspree(dateInviteData) 
{
    fetch(formspreeEndPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dateInviteData)
    });
}

renderCard(
    "🌹<b>Dejt</b>🌹 ?",
    "./Images/yes-gif-3.gif",
    [
        {
            id: "yes-btn",
            text: "Yes",
            onClick: showYesAnswer
        },
        {
            id: "no-btn",
            text: "No",
            onClick: moveNoButton,
            onMouseOver: moveNoButton
        }
    ]
);
