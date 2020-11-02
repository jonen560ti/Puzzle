let grid = document.getElementsByClassName("box");
var RKArray = ["r1k1","r1k2","r1k3","r1k4","r2k1","r2k2"
              ,"r2k3","r2k4","r3k1","r3k2","r3k3","r3k4"];
const VictoryFanfare = new Audio("fanfare.mp3");
var PuzzleComplete = false;
var MovesUsed = 0;
// //controller

document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;
  
  function handleDragStart(e) {
  //   this.style.opacity = '0.4';
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
      e.preventDefault();
    } if (dragSrcEl != this && PuzzleComplete === false) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      CheckSolution();
    } else {
      return false;
    }
  }

  function handleDragEnd(e) {
  //   this.style.opacity = '1';
    
    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }
  
  
  let items = document.querySelectorAll('.container .box');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });

shufflePieces();

  function shufflePieces() {
    var innerhtmltemplate = '<img id="pict-rxkx" src="rxkx.png" draggable="true">';
    Array.from(grid).forEach(tile => {
      console.log(RKArray);
      var options = RKArray.length;
      var selected = Math.floor(Math.random() * Math.floor(options));
      var RK = RKArray[selected];
      var newhtml = innerhtmltemplate.replace(/rxkx/g, RK);
      RKArray.splice(selected, 1);
      tile.innerHTML = newhtml;
    })
  }
});



  function checkTile(item, index) {
    console.log(item + index);
  }

  function puzzleComplete() {
    VictoryFanfare.play();
    PuzzleComplete = true;
    document.getElementById("victxt").innerHTML = `You did the thing!`;
    console.log("Puzzle is completed");
  }

function checkPuzzleProgress(SolutionArray) {
  CorrectlyPlacedPieces = 0;
  Array.from(SolutionArray).forEach(status => {
if(status) {
CorrectlyPlacedPieces++;
  }
});
return (100 * CorrectlyPlacedPieces) / grid.length;
}


  function CheckSolution() {
      var solutionArray = [];
      CorrectlyPlacedPieces = 0;
      Array.from(grid).forEach(tile => {
        //solutionArray.push(tile.id == tile.firstChild.id);
        if (tile.firstElementChild === null) {
            console.log(tile.id + " Doesn't have a puzzle piece")
            solutionArray.push(false);
            return;            
        }
        
        let picid = tile.firstElementChild.id.replace("pict-", "");
        if (picid === tile.id) {
          console.log(tile.id + " has the correct piece")
          solutionArray.push(true);
          CorrectlyPlacedPieces++;
        } else {
          console.log(tile.id + " has the wrong piece");
          solutionArray.push(false);
        }
        
    });
    MovesUsed++;
    document.getElementById("MovesUsed").innerHTML = "Moves: " + MovesUsed;
    console.log(CorrectlyPlacedPieces);
    document.getElementById("victxt").innerHTML = Math.round(checkPuzzleProgress(solutionArray)) + "%";
    if (solutionArray.includes(false) || solutionArray.length == null) {
      console.log("Puzzle not yet completed");
      return;
    }
    puzzleComplete();
  }

