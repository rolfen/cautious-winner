
export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
}

export class BlockGrid {

	deleteBlock() {
		// remove block and move down all blocks that are above
		// ( to simulate gravity)
	}

    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render (el = document.querySelector('#gridEl')) {
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = MAX_Y - 1; y >= 0; y--) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

    getCluster (block) {
    	var cluster = [];

	    var floodMatch = (block, colour) => {
	    	if(block.colour === colour) {
	    		cluster.push(block);
		    	var x = block.x;
		    	var y = block.y;
		    	var north = this.grid[x+1] ? this.grid[x+1][y] : undefined;
		    	var south = this.grid[x-1] ? this.grid[x-1][y] : undefined;
		    	var east = this.grid[x][y+1];
		    	var west = this.grid[x][y-1];
		    	[north,south,east,west].forEach((adjacentBlock)=>{
		    		if(adjacentBlock && (cluster.indexOf(adjacentBlock) === -1)) {
		    			floodMatch(adjacentBlock, colour);
		    		}
		    	});
	    	}
	    }
	    floodMatch(block, block.colour)
	    return cluster;
    }

    blockClicked (e, block) {

        console.log(this.getCluster(block));

    }
}

grid = new BlockGrid();

window.addEventListener('DOMContentLoaded', () => grid.render());
