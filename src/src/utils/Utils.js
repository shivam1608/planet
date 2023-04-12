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

const generateHash = (val) =>
  crypto.subtle
    .digest('SHA-256', new TextEncoder('utf-8').encode(val))
    .then(h => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join('');
    });

export {compressTitle , generateHash};