
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


    adjacentInCollection (coll, block) {
    	var foundGroup = [];
    	var currentGroup = [];

		for(let i =0; i < coll.length; i++) {
			let curr = coll[i];
			if(block.colour === curr.colour) {
				currentGroup.push(curr);
				if(block === curr) {
					// we found the item, so this is the adjacent group
					foundGroup = currentGroup;
				}
			} else {
				// Entering new group
				currentGroup = [];
			}
		}

		return(foundGroup);  	
    }

    blockClicked (e, block) {

        var col = this.grid[block.x];

        //console.log(block)
        // console.log(this.adjacentInCollection(col, block));
        var adjacentBlocks = []

        // get vertically adjacent rows
        debugger;
        this.adjacentInCollection(col, block).forEach((vAdjBlock) => {
	        // and for each one of these, get horizontally adjacent rows
	        let row = this.grid.map((col) => col[vAdjBlock.y]);
	        this.adjacentInCollection(row, block).forEach((hAdjBlock) => {
	        	adjacentBlocks.push(hAdjBlock);
	        })
        });

        console.log(adjacentBlocks);
    }
}

grid = new BlockGrid();

window.addEventListener('DOMContentLoaded', () => grid.render());
