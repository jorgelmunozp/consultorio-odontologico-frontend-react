const iconUp = '▴'; 
const iconDown = '▾'; 

export const Arrows = ( {direction} ) => {
    if(direction === "up"){return iconUp; } 
    else if(direction === "down"){ return iconDown; } 
}