import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from 'fs/promises';

const width = 800;
const height = 600;

const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

/**
 * Renders a histogram of the given number array and saves it as a PNG.
 * @param data Array of numbers to plot
 * @param outputPath Optional output file path (default: 'distribution.png')
 * @param bins Number of histogram bins (default: 10)
 */
export async function renderDistributionChart(
    data: number[],
    outputPath = 'distribution.png',
    bins = 10
): Promise<void> {
    if (data.length === 0) {
        throw new Error('Data array is empty.');
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const binSize = (max - min) / bins;

    const labels = Array.from({ length: bins }, (_, i) =>
        `${(min + i * binSize).toFixed(1)}–${(min + (i + 1) * binSize).toFixed(1)}`
    );

    const frequencies = new Array(bins).fill(0);
    data.forEach(value => {
        const index = Math.min(Math.floor((value - min) / binSize), bins - 1);
        frequencies[index]++;
    });

    const config = {
        type: 'bar' as const,
        data: {
            labels,
            datasets: [
                {
                    label: 'Frequency',
                    data: frequencies,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                },
            ],
        },
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Value Distribution',
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Bins',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Frequency',
                    },
                },
            },
        },
    };

    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(config);
    await fs.writeFile(outputPath, imageBuffer);
    console.log(`Chart saved to ${outputPath}`);
}
