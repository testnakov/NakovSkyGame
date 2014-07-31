function Soldiers() {
    this.id = [];
    this.left = [];
    this.top = [];
    this.numSetInterval = [];
    this.state = [];
    this.landedHeight = [];
	this.width = [];
    this.gameLoop = true;
}

Soldiers.prototype.add = function add(left, top) {
    var containerHalfWidth = document.getElementById('gameScreen').clientWidth / 2,
        imageName;

    imageName = 'images/landedParatroop.png';

    this.id.push('parachutist' + this.id.length);
    this.top.push(top);
    this.left.push(left);
	this.width.push(containerHalfWidth * 0.35);
    this.domElement = document.createElement('img');
    this.domElement.setAttribute('id', this.id[this.id.length - 1]);
    this.domElement.setAttribute('class', 'paratrooper');
    this.domElement.name = 'paratrooper';
    this.domElement.setAttribute('src', imageName);
    this.domElement.style.top = this.top[this.id.length - 1] + 'px';
	this.domElement.style.width = this.width[0] + 'px';
    this.domElement.style.left = left + 'px';
    document.getElementById('container').appendChild(this.domElement);
};

Soldiers.prototype.falling = function falling() {

    if (this.gameLoop  === false) return;

    var containerHeight = document.getElementById('container').clientHeight * 0.98,
        containerHalfWidth = document.getElementById('container').clientWidth / 2,
        baseHalfWidth = document.getElementById('base').clientWidth / 2,
        baseHeight = document.getElementById('base').clientHeight,
        imageNameFalling,
        imageNameLanded,
        i = 0;

    var paratroopers = document.getElementsByName('paratrooper');


    for (i = 0; i < paratroopers.length; i+=1) {

        imageNameFalling = 'images/paratroop.png';
		imageNameLanded = 'images/landedParatroop.png';

        var soldier = paratroopers[i],
            startLeftPositionOfBase = containerHalfWidth -  baseHalfWidth,
            endRightPositionOfBase = containerHalfWidth +  baseHalfWidth,
            left = parseInt(soldier.style.left),
            top = parseInt(soldier.style.top),
            id = soldier.id,
            landedHeight,
            landedState;


        if(startLeftPositionOfBase <= left && left <= endLeftPositionOfBase){

            landedHeight = containerHeight  - soldier.clientHeight - baseHeight;
            landedState = 'landed of weapon';
        } else if (startLeftPositionOfBase > this.left[i]){
            landedHeight = containerHeight  - soldier.clientHeight;
            landedState = 'landed left';
        } else if (this.left[i] > endRightPositionOfBase){
			landedHeight = containerHeight  - soldier.clientHeight;
            landedState = 'landed right';
		}

        if (this.state[id] === undefined || this.state[id].substring(0,6) !== 'landed') {
            if (top < containerHeight * 0.3) {
                soldier.style.top = (top + 5) + 'px';
                top += 5;
                if (!this.state[id]) this.state[id] = 'fall';
            } else if (top >= containerHeight * 0.3 && top < landedHeight ) {
                if (this.state[id] === 'fall') {
                    this.state[id] = 'fall with parachute';
                    soldier.setAttribute('src', imageNameFalling);
                    this.domElement.setAttribute('class', 'paratrooper shakeParatrooper');
                }
                soldier.style.top = (top + 1) + 'px';
                top += 1;
            } else {
                if (this.state[id] === 'fall with parachute') {
                    this.state[id] = landedState;
                    this.landedHeight[id] = top;
                    soldier.setAttribute('src', imageNameLanded);					
                }
            }
        } else {
            soldier.style.top = this.landedHeight[id] + 'px';
        }
		//landedState === 'landed left' && 
		if (this.top[i] >= landedHeight) {
			while (startLeftPositionOfBase - baseHalfWidth > this.left[i]){
				soldier.style.left = (this.left[i] + 0.001) + 'px';
				this.left[i] += 0.001;
			}
			while (endRightPositionOfBase < this.left[i]){
				soldier.style.left = (this.left[i] - 0.001) + 'px';
				this.left[i] -= 0.001;
			}			
		}
    }

};


function setIntervalParatrooper(trooper) {
    trooper.setIntervalMove = setInterval(function () {
        trooper.falling();
    }, 100);
}

var trooper = new Soldiers();








