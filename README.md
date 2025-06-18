# Lovevolution
## Rules of the Game
### Constants
- **Epochs**: The number of epochs _n<sub>e</sub>_ in the evolution.
- **Initial Population**: The number of parents _n<sub>0</sub>_ in the initial epoch.
- **Initial Probability of Cooperation**: The initial probability of cooperation _P<sub>0</sub> (C)_ for each parent in the initial epoch. (This can also be a probability distribution, e.g. uniform distribution over the range [0, 1].)
- **Mutation Probability**: The probability _P<sub>m</sub>_ that a parent will mutate its probability of cooperation _P<sub>p</sub> (C)_ during reproduction.
- **Mutation Amount**: The amount _ΔP<sub>p</sub> (C)_ by which a parent can mutate its probability of cooperation _P<sub>p</sub> (C)_ during reproduction.
- **Reproduction Factor**: The reproduction factor _r_ that determines how many offsprings are produced by each pair of parents in the game of life.
- **Game of Life Parameters**: The parameters of the game of life, which determine how many offsprings are produced by each pair of parents. This can be defined as a two-dimensional matrix _G_ where _G<sub>X</sub><sub>Y</sub>_ is the number of offsprings produced by parents with choices _X_ and _Y_.
### Evolution
Each epoch _e_ consists of _n<sub>e</sub>_ parents (_p_). These are all defined by a single attribute _P<sub>p</sub> (C)_ - the probability that they will choose option _C_ in the _game of life_ (_Probability of Cooperation_ see [Game of Life](#game-of-life)). The epoch can be divided into two stages:
1. **Selection**: Parents are randomly divided into pairs. If the number of parents is odd, a randomly chosen parent is executed (deleted from memory).
2. **Reproduction**: Each pair participates in the game of life. The parents reproduce and each of the offsprings 
   inherits exactly the same probability (_P<sub>p</sub> (C)_) from their parents. The number of offsprings is 
   determined by the [Game of Life](#game-of-life) and is then multiplied by a constant reproduction factor _r_ in 
   order to sustain the population. 
   The 
   offsprings are then added to 
   the next epoch _e+1_.
3. **Mutation**: Each offspring has a small (possible even zero) probability _P<sub>m</sub>_ of mutating its attribute _P<sub>p</sub> (C)_ by a small amount _ΔP<sub>p</sub> (C)_. The mutation is defined as:
   - If the mutation occurs, the new value is _P<sub>p</sub> (C) + ΔP<sub>p</sub> (C)_. If the new value exceeds the range of [0, 1], it is set to the nearest of the two bounds (0 or 1).
   - If the mutation does not occur, the value remains unchanged.
4. **Next Epoch**: The offsprings become the parents of the next epoch _e+1_. (previous parents are executed).
### Game of Life
The game of life is a two-dimensional matrix _G_ where _G<sub>X</sub><sub>Y</sub>_ is the number of offsprings produced by parents with choices _X_ and _Y_. The choices are defined as follows:
- _C_: Cooperation
- _D_: Defection
The choice for each parent is determined by its probability of cooperation _P<sub>p</sub> (C)_ and are chosen randomly withing this probability.
#### Explanation of the Matrix
The matrix has three rows and three columns, where each of the second two rows represents the cooperative and defective choice of parent _X_ and parent _Y_ respectively. The first row and first column represent the choices of parent _X_ and parent _Y_ respectively. The values in the matrix represent the number of offsprings produced by each pair of parents with choices _X_ and _Y_. The values are defined as follows:
#### Game of Life Matrix
|   | C      | D      |
|---|--------|--------|
| C | (2, 2) | (0, 1) |
| D | (1, O) | (1, 1) |

