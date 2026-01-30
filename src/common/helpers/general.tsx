/**
 * Generates a set number of random hex values and returns each one as a collective array
 *
 * @param length - The total number of colours to generate
 * @returns Returns an array of colours.
 *
 */
export const randomHexColorCode = (length:number = 3) => {
    let returnHexes = [];
    for(let i=1;i<=length;i++){
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        returnHexes.push('#' + n.slice(0, 6))
    }
    return returnHexes;
};
