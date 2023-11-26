const iconUp = '▴'; 
const iconDown = '▾'; 

export const Arrows = ( {direction} ) => {
    console.log(direction)
    if(direction === "up"){
        console.log("1: ",iconUp)
        return iconUp;
    } else if(direction === "down"){
        return iconDown;
    } 
}