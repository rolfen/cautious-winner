
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

	deleteBlock(block) {
		// move all blocks above down by one notch
		for(let y = block.y; y < this.grid[block.x].length; y++) {
			if (y === (this.grid[block.x].length - 1)) {
				// insert grey block on top
				this.grid[block.x][y] = new Block(block.x, y);
				this.grid[block.x][y].colour = 'gray';
			} else {
				this.grid[block.x][y] = this.grid[block.x][y+1];
				this.grid[block.x][y].y = y;
				this.grid[block.x][y].x = block.x;
			}
		}
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

		/*
		 * Recursive function. Given a block, finds all blocks from similar color which are clustered around it
		 * https://en.wikipedia.org/wiki/Flood_fill
		 *
		 * @param {Block} block A block object inside the cluster 
		 * @param {string} colour Color of the cluster
		 * @param {array} cluster A reference to an array which will be populated with all block in the cluster
		 */
	    var floodMatch = (block, colour, cluster) => {
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
		    			floodMatch(adjacentBlock, colour, cluster);
		    		}
		    	});
	    	}
	    }
	    
    	var cluster = [];
	    floodMatch(block, block.colour, cluster);
	    return cluster;
    }

    blockClicked (e, block) {
        this.getCluster(block).forEach((clusterBlock) => {
        	this.deleteBlock(clusterBlock);
        });
    }
}

var blockGrid = new BlockGrid();

window.addEventListener('DOMContentLoaded', () => {
	var gridEl = document.querySelector('#gridEl');
	gridEl.addEventListener('click', () => {
		// re-render
		gridEl.innerHTML = '';
		blockGrid.render(gridEl);
	}) 
	// initial render
	blockGrid.render(gridEl)
});
