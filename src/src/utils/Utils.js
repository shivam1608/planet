const compressTitle = (title) => {
    if(title.length<=60){
        return title;
    }
    let formatIndex = title.lastIndexOf('.');
    const arr = [...title];
    let newTitle = arr.slice( 0 , 42);
    newTitle.splice(42 , 0 , "." , "." , ".", "." , ".");
    newTitle.push(...arr.slice(formatIndex-(11)));
    return newTitle.join("");
}

export {compressTitle};