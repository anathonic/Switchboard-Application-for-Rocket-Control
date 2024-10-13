<template>
  <div class="flex justify-center">
    <div id="vue-canvas"></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, watch, ref} from 'vue';
import p5 from 'p5';
import {topSwitches, bottomSwitches} from "@/switchesConfig";

const props = defineProps({
  topSwitchesStates: {
    type: Array,
    default: () => [false, false, false, false, false, false]
  },
  bottomSwitchesStates: {
    type: Array,
    default: () => [false, false, false, false, false, false]
  }
});

const topSwitchesStates = ref([...props.topSwitchesStates]);
const bottomSwitchesStates = ref([...props.bottomSwitchesStates]);

watch(() => props.topSwitchesStates, (newValue) => {
  topSwitchesStates.value = newValue;
}, { immediate: true });

watch(() => props.bottomSwitchesStates, (newValue) => {
  bottomSwitchesStates.value = newValue;
}, { immediate: true });

const setupCanvas = () => {

  var cellSize = 30;
  var wireLength = 20;
  var cutOffLength = 2;
  var straightness = 5;
  var available = [];
  let gridWidth: number;
  var gridHeight: number;

  var dirs = [
    [-1, -1], [0, -1], [1, -1],
    [1, 0],
    [1, 1], [0, 1], [-1 , 1],
    [-1, 0]
  ];
  const script = (p5: p5) => {

    p5.setup = () => {
      const canvas = p5.createCanvas(600, 400);
      canvas.parent("vue-canvas");
      p5.colorMode(p5.RGB);
      resize();

    };

    class Cell {
      x: number;
      y: number;
      available: boolean;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.available = true;
      }
    }
    class Wire {
      cells: Cell[];
      last: number;
      constructor(start: Cell) {
        this.cells = [];
        this.cells.push(start);
        this.last = findOpenDir(start.x, start.y);
      }
      render() {
        p5.noFill();
        p5.strokeWeight(cellSize / 6);
        p5.stroke(255,255, 255);
        p5.beginShape();
        for (let i = 0; i < this.cells.length; i++) {
          const cell = this.cells[i];
          p5.vertex((cell.x + 0.5) * cellSize, (cell.y + 0.5) * cellSize);
        }
        p5.endShape();
        p5.fill(0);
        p5.strokeWeight(cellSize / 6);
        const end = this.cells.length - 1;
        p5.ellipse((this.cells[0].x + 0.5) * cellSize, (this.cells[0].y + 0.5) * cellSize, cellSize * 0.7);
        p5.ellipse((this.cells[end].x + 0.5) * cellSize, (this.cells[end].y + 0.5) * cellSize, cellSize * 0.7);
      }

      generate() {
        let hasSpace = true;
        while (this.cells.length < wireLength && hasSpace) {
          const prevCell = this.cells[this.cells.length - 1];
          let tries = [0, 1, -1];
          if (p5.random() > 0.5) tries = [0, -1, 1];
          let found = false;
          hasSpace = false;

          while (tries.length > 0 && !found) {
            const mod = tries.splice(p5.floor(p5.pow(p5.random(), straightness) * tries.length), 1)[0];
            let index = this.last + 4 + mod;
            if (index < 0) index += 8;
            if (index > 7) index -= 8;
            const dir = dirs[index];

            const x = dir[0] + prevCell.x;
            const y = dir[1] + prevCell.y;
            if (x >= 0 && x < gridWidth - 1 && y >= 0 && y < gridHeight - 1) {
              const cell = grid[x][y];
              if (cell.available && noCrossOver(index, x, y)) {
                this.cells.push(cell);
                cell.available = false;
                hasSpace = found = true;
                this.last = this.last + mod;
                if (this.last < 0) this.last += 8;
                if (this.last > 7) this.last -= 8;
              }
            }
          }
        }
      }
    }
    let grid: Cell[][] = [];
    let wires: Wire[] = [];
    const noCrossOver = (index: number, x: number, y: number) => {
      if (index == 0) return (grid[x+1][y].available || grid[x][y+1].available);
      if (index == 2) return (grid[x-1][y].available || grid[x][y+1].available);
      if (index == 4) return (grid[x-1][y].available || grid[x][y-1].available);
      if (index == 6) return (grid[x+1][y].available || grid[x][y-1].available);
      return true;
    };

    const findOpenDir = (x: number, y: number) => {
      var checks = [0, 1, 2, 3, 4, 5, 6, 7];
      while (checks.length > 0){
        var index = checks.splice(p5.floor(p5.random()*checks.length), 1)[0];

        var x2 = x + dirs[index][0];
        var y2 = y + dirs[index][1];
        if (x2 >= 0 && x2 < gridWidth - 1 && y2 >= 0 && y2 < gridHeight - 1){
          if (grid[x2][y2].available) return index;
        }
      }
      return 0;
    };


    const recreate = () => {
      gridWidth = p5.ceil(p5.width/cellSize)+1;
      gridHeight = p5.ceil(p5.height/cellSize)+1;
      grid = [];
      available = [];
      wires = [];

      for (var i = 0; i < gridWidth; i++){
        grid.push([]);
        for (var j = 0; j < gridHeight; j++){
          var cellObj = new Cell(i, j);
          grid[i][j] = cellObj;
          available.push(cellObj);
        }
      }

      while(available.length > 0){
        var cell = available[p5.floor(p5.random()*available.length)];
        cell.available = false;
        var wire = new Wire(cell);
        wire.generate();
        wires.push(wire);
        for (var k = 0; k < wire.cells.length; k++){
          available.splice(available.indexOf(wire.cells[k]), 1);
        }
      }
      p5.loop();
    };

    const drawPUT = () => {
      p5.textSize(32);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.fill(0);
      p5.text("PUT", p5.width / 2 + 8, p5.height / 2);
      p5.text("ROCKETLAB", p5.width / 2 + 72, p5.height / 2 + 30);
      p5.textSize(20);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text("Designed by Janina", p5.width / 2 + 65, p5.height / 2 + 55);
      p5.textSize(50);
      p5.text("Switchboard", p5.width / 2 + 110, p5.height / 2 + 90);
    }


    const drawSwitches = () => {
      let squareSize = p5.min(p5.width, p5.height) * 0.1;
      let squareQuantity = 6;
      var biggerDotSize = 60;
      var smallerDotSize = 30;
      let spacing  = 120;
      let x = (p5.width / 2 - squareSize / 2 - 390);
      let y1 = p5.height / 2 - squareSize / 2 - 140;
      let y2 = p5.height / 2 - squareSize / 2 + 200;
      for (let i = 0; i < squareQuantity; i++){
        x+= spacing;
        p5.fill(0, 0, 0);
        p5.ellipse(x + 38, y1 + 38, biggerDotSize, biggerDotSize);
        if(topSwitchesStates.value[i]) {
          // p5.fill(31,41,55);
          p5.fill(66,178,128);
        } else {
          p5.fill(255, 119, 0);
        }
        p5.ellipse(x + 38, y1 + 38, smallerDotSize, smallerDotSize);
        p5.fill(0, 0, 0);
        p5.ellipse(x + 38, y2 + 38, biggerDotSize, biggerDotSize);
        if(bottomSwitchesStates.value[i]) {
          p5.fill(66,178,128);
          // p5.fill(31,41,55);
        } else {
          p5.fill(255, 119, 0);
        }
        p5.ellipse(x + 38, y2 + 38, smallerDotSize, smallerDotSize);
      }
    }

    const drawWires = () => {
      for (let i = 0; i < wires.length; i++) {
        if (wires[i].cells.length > cutOffLength) {
          wires[i].render();
        }
      }
    }


    const resize = () => {
      if (typeof window !== 'undefined') {
        const { innerWidth, innerHeight } = window;
        p5.resizeCanvas(innerWidth, innerHeight);
        recreate();
      }
    };


    p5.mouseClicked = () => {
      let squareSize = p5.min(p5.width, p5.height) * 0.1;
      let spacing = 120;
      let x = (p5.width / 2 - squareSize / 2 - 390);
      let y1 = p5.height / 2 - squareSize / 2 - 140;
      let y2 = p5.height / 2 - squareSize / 2 + 200;

      for (let i = 0; i < topSwitchesStates.value.length; i++) {
        x += spacing;
        if (
            p5.mouseX > x &&
            p5.mouseX < x + squareSize &&
            ((p5.mouseY > y1 && p5.mouseY < y1 + squareSize))
        ) {
          if(topSwitches[i].type !== 'monostable') {
            topSwitchesStates.value[i] = !topSwitchesStates.value[i];
          }
        }
        if (
            p5.mouseX > x &&
            p5.mouseX < x + squareSize &&
            ((p5.mouseY > y2 && p5.mouseY < y2 + squareSize))
        ) {
          if(bottomSwitches[i].type !== 'monostable') {
            bottomSwitchesStates.value[i] = !bottomSwitchesStates.value[i];
          }
        }
      }
      drawSwitches();
    }


    p5.draw = () => {
      drawWires();
      drawSwitches();
      drawPUT();
      p5.noLoop();
    };
  };
  const P5 = p5;
  new P5(script);
};


onMounted(() => {
  setupCanvas();
});

</script>

<style scoped>
#vue-canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  min-width: 512px;
  height: 512px;
  margin: 0 auto;
  padding: 0;
  border-radius: 20px;
  overflow: hidden;
  border-color: white;
  border-width: 2px;
}
</style>



