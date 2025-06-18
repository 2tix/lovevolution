import { renderDistributionChart } from './graphing';

const matrix = [
    [[1, 1], [1, 0]],
    [[0, 1], [2, 2]]
];

const epochs = 20;
const initialPopulation = [.8, .8, .8, .8];
const r = 1.5;
const mutationProbability = 0.001;
const mutationAmount = 0.01;

/**
* @description This function performs the game of life taking the choices of X and Y as boolean values and returning the numbers of offspring for each of the parents.
 * @param {number} X - The choice of parent X. (1 for cooperation, false for 0)
 * @param {number} Y - The choice of parent Y. (1 for cooperation, false for 0)
 * @return {number[]} - An array containing the number of offspring for parent X and parent Y respectively.
 **/
const game = (X: number, Y: number): number[] => {
    if(matrix[X]){
        if(matrix[X][Y] !== undefined){
            return matrix[X][Y];
        }
    }

    return [0, 0];
}

/**
 * @description This function simulates the reproduction of a population based on the game of life.
 * It takes an array of numbers representing the population and returns an array of offspring.
 * Each pair of parents in the population will produce offspring based on their choices in the game.
 * @param {number[]} population - An array representing the current population.
 * @return {number[]} - An array representing the offspring produced by the population.
 **/

const reproduce = (population: number[]): number[] => {
    if(population) {
        const offspring: number[] = [];
        for (let i = 0; i + 1 < population.length; i += 2) {
            // @ts-ignore
            const X = population[i] > Math.random() ? 1 : 0;
            // @ts-ignore
            const Y = population[i + 1] > Math.random() ? 1 : 0;

            const result = game(X, Y);

            // @ts-ignore
            for (let j = 0; j < result[0]*r; j++) {
                offspring.push(X);
            }

            // @ts-ignore
            for (let j = 0; j < result[1]*r; j++) {
                offspring.push(Y);
            }
        }
        return offspring;
    }

    return [];
}

const mutate = (population: number[]): number[] => {
    if (population) {
        return population.map(individual => {
            if (Math.random() < mutationProbability) {
                const mutation = (Math.random() * 2 - 1) + mutationAmount; // Random mutation in the range [-mutationAmount, mutationAmount]
                return Math.max(0, Math.min(1, individual + mutation)); // Ensure the value stays within [0, 1]
            }
            return individual; // No mutation
        });
    }
    return [];
}

let population = initialPopulation.slice();

for (let e = 0; e < epochs; e++) {
    const offspring = reproduce(population);
    population = mutate(offspring);
}

console.log("Final Population:", population.length);
console.log("Population Distribution:", population);

renderDistributionChart(population, 'chart.png', 20).then(r => console);
