import Board from './Board';
class Player {
    constructor(max_depth = -1) {
        this.max_depth = max_depth;
        this.nodes_map = new Map();
    }
    getBestMove(board, maximizing = true, callback = () => { }, depth = 0) {
        let arr = []
        let rand = ''
        let ret = ''
        let moves = ''
        if (board.constructor.name !== "Board") throw Error('The first argument to the getBestMove method should be an instance of Board class.');
        if (depth === 0) this.nodes_map.clear();
        if (board.isTerminal() || depth === this.max_depth) {
            if (board.isTerminal().winner === 'x') {
                return 100 - depth;
            } else if (board.isTerminal().winner === 'o') {
                return -100 + depth;
            }
            return 0;
        }
        //Current player is maximizing
        if (maximizing) {
            //Initializ best to the lowest possible value
            let best = -100;
            //Loop through all empty cells
            board.getAvailableMoves().forEach(index => {
                //Initialize a new board with the current state (slice() is used to create a new array and not modify the original)
                let child = new Board(board.state.slice());
                //Create a child node by inserting the maximizing symbol x into the current emoty cell
                child.insert('x', index);
                //Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
                let node_value = this.getBestMove(child, false, callback, depth + 1);
                //Updating best value
                best = Math.max(best, node_value);

                //If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
                if (depth === 0) {
                    //Comma seperated indicies if multiple moves have the same heuristic value
                    moves = this.nodes_map.has(node_value) ? `${this.nodes_map.get(node_value)},${index}` : index;
                    this.nodes_map.set(node_value, moves);
                }
            });
            //If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
            if (depth === 0) {
                if (typeof this.nodes_map.get(best) === 'string') {
                    arr = this.nodes_map.get(best).split(',');
                    rand = Math.floor(Math.random() * arr.length);
                    ret = arr[rand];
                } else {
                    ret = this.nodes_map.get(best);
                }
                //run a callback after calculation and return the index
                callback(ret);
                return ret;
            }
            //If not main call (recursive) return the heuristic value for next calculation
            return best;
        }
        if (!maximizing) {
            //Initializ best to the highest possible value
            let best = 100;
            //Loop through all empty cells
            board.getAvailableMoves().forEach(index => {
                //Initialize a new board with the current state (slice() is used to create a new array and not modify the original)
                let child = new Board(board.state.slice());
                //Create a child node by inserting the minimizing symbol o into the current emoty cell
                child.insert('o', index);

                //Recursively calling getBestMove this time with the new board and maximizing turn and incrementing the depth
                let node_value = this.getBestMove(child, true, callback, depth + 1);
                //Updating best value
                best = Math.min(best, node_value);

                //If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
                if (depth === 0) {
                    //Comma seperated indicies if multiple moves have the same heuristic value
                    moves = this.nodes_map.has(node_value) ? this.nodes_map.get(node_value) + ',' + index : index;
                    this.nodes_map.set(node_value, moves);
                }
            });
            //If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
            if (depth === 0) {
                if (typeof this.nodes_map.get(best) === 'string') {
                    arr = this.nodes_map.get(best).split(',');
                    rand = Math.floor(Math.random() * arr.length);
                    ret = arr[rand];
                } else {
                    ret = this.nodes_map.get(best);
                }
                //run a callback after calculation and return the index
                callback(ret);
                return ret;
            }
            //If not main call (recursive) return the heuristic value for next calculation
            return best;
        }
    }
}
export default Player;