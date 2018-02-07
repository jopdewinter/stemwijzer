var options = {
    agreed: 0,
    disagreed: 0,
    neither: 0,
    currentChoice: null
}
var i = 0;

window.onload = () => {
    console.log(subjects)
    newStatement()

    document.getElementById("agreed").addEventListener("click", () => {
        options.currentChoice = 0;
        options.agreed++
});

    document.getElementById("disagreed").addEventListener("click", () => {
        options.currentChoice = 0;
        options.disagreed++
});

    document.getElementById("neither").addEventListener("click", () => {
        options.currentChoice = 0;
        options.neither++
});

    document.getElementById("next").addEventListener("click", () => {
        choiceCheck();
        newStatement();
        options.currentChoice = null;
});

}

function choiceCheck() {
    if (options.currentChoice === null) {
        alert("Maak eerst een keuze")
    } else {
        i++
    }
}

function newStatement() {
    if (i < 3) {
        document.getElementById("title").innerText = subjects[i].title;
        document.getElementById("statement").innerText = subjects[i].statement;
        getProsCons(i)
    }
}

function getProsCons(i) {
    var parentPros = document.getElementById("pros");
    var parentCons = document.getElementById("cons");
    parentPros.innerHTML = "";
    parentCons.innerHTML = "";
    for (var k = 0; k < subjects[i].parties.length; k++) {
        var child = "<p>" + subjects[i].parties[k].name + "</p>";
        console.log(subjects[i].parties[k].name)
        if (subjects[i].parties[k].position === "pro") {
            parentPros.innerHTML += child
        } else {
            parentCons.innerHTML += child
        }
    }
}