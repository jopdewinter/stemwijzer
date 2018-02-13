var options = {
    agreed: 0,
    disagreed: 0,
    neither: 0,
    currentChoice: null
}
var i = 0;
var j = [];
var q = 0;

window.onload = () => {
    console.log(subjects)
    console.log(parties)
    newStatement();

    document.getElementById("back").addEventListener("click", () => {
        options.currentChoice = 0;
        q++;
        if (i === 0) {
            document.getElementById("back").style.display = "none";
        }
        i = i - 1;
        newStatement()
    });

    document.getElementById("agreed").addEventListener("click", () => {
        options.currentChoice = 0;
        options.agreed++
        for (var k = 0; k < subjects[i].parties.length; k++) {
            var position = subjects[i].parties[k].name;
            if (subjects[i].parties[k].position === "pro") {
                j.push(position)
            }
        }
    });

    document.getElementById("disagreed").addEventListener("click", () => {
        options.currentChoice = 0;
        options.disagreed++
        for (var k = 0; k < subjects[i].parties.length; k++) {
            var position = subjects[i].parties[k].name;
            if (subjects[i].parties[k].position === "contra") {
                j.push(position)
            }
        }
    });

    document.getElementById("neither").addEventListener("click", () => {
        options.currentChoice = 0;
        options.neither++
        for (var k = 0; k < subjects[i].parties.length; k++) {
            var position = subjects[i].parties[k].name;
            if (subjects[i].parties[k].position === "ambivalent") {
                j.push(position)
            }
        }
    });

    document.getElementById("next").addEventListener("click", () => {
        choiceCheck();
        newStatement();
        options.currentChoice = null;
        document.getElementById("back").style.display = "";
    });

    document.getElementById("skip").addEventListener("click", () => {
        options.currentChoice = 0;
        choiceCheck();
        newStatement();
    });

    document.getElementById("resultButton").addEventListener("click", () => {
        document.getElementById("bodyDiv").innerHTML = "";
        document.getElementById("filterParties").style.display = "";
        document.getElementById("filterSeculier").style.display = "";
        var name = "";
        var result = "";
        var resultArray = [];
        for (var k = 0; k < subjects[i-1].parties.length; k++) {
            name = subjects[i-1].parties[k].name;
            result = j.filter(item => item == name).length;
            result = result - q;
            resultArray.push(result + " " + name)
        }
        var parent = document.getElementById("result")
        var secondParent = document.createElement("div")
        var child = document.createElement("p");
        resultArray = resultArray.sort().reverse();
        for (var p = 0; p < resultArray.length ; p++) {
            child.innerHTML = resultArray[p];
            secondParent.appendChild(child);
        }
        parent.appendChild(secondParent);
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
        console.log(i)
        document.getElementById("title").innerText = subjects[i].title;
        document.getElementById("statement").innerText = subjects[i].statement;
        getProsCons(i)
    }
    if (i === 3) {
        document.getElementById("resultButton").style.display = "";
    }
}

function getProsCons(i) {
    var parentPros = document.getElementById("pros");
    var parentCons = document.getElementById("cons");
    var parentAmb = document.getElementById("amb");
    parentPros.innerHTML = "";
    parentCons.innerHTML = "";
    parentAmb.innerHTML = "";
    for (var k = 0; k < subjects[i].parties.length; k++) {
        var child = document.createElement("p");
        var secondChild = document.createElement("p");
        var div = document.createElement("div");
        child.addEventListener("click", (event) => {
            var pew = event.srcElement.parentElement.children[1];
            if (pew.style.display === "none") {
                pew.style.display = "";
            } else {
                pew.style.display = "none";
            }
        });
        secondChild.innerHTML = subjects[i].parties[k].explanation;
        secondChild.style.display = "none";
        child.innerHTML = subjects[i].parties[k].name;
        div.appendChild(child);
        div.appendChild(secondChild);
        if (subjects[i].parties[k].position === "pro") {
            parentPros.appendChild(div);
        } else if (subjects[i].parties[k].position === "contra") {
            parentCons.appendChild(div);
        } else {
            parentAmb.appendChild(div);
        }
    }
}

function filterParties() {
    for (var k = 0; k < parties; k++) {
        if (parties[k].size <= 14) {

        }
    }
}

function filterSeculier() {
    for (var k = 0; k < parties; k++) {
        if (parties[k].secular != true) {

        }
    }
}