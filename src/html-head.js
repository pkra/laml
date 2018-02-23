const metaTagGenerator = function(document, argArr){
    // expects array of strings of type `attribute="value"`
    const checkForElement = document.querySelector('head [' + argArr.join('][') + ']');
    if (!checkForElement){
        const metaElement = document.createElement('meta');
        for (let argument of argArr){
            const split = argument.split('="');
            metaElement.setAttribute(split[0], split[1].substring(0, split[1].length-1));
        }
        document.head.appendChild(metaElement);
        return metaElement;
    }
    else return checkForElement;
}
module.exports = function(document) {
    // some good practices (especially for fragments)
    // add <meta charset="UTF-8">
    metaTagGenerator(document, ['charset="UTF-8"']);
    // <meta name="viewport" content="width=device-width, initial-scale=1.0">
    metaTagGenerator(document, ['name="viewport"', 'content="width=device-width, initial-scale=1.0"'])
    // <meta http-equiv="X-UA-Compatible" content="ie=edge">
    metaTagGenerator( document, ['http-equiv="X-UA-Compatible"', 'content="ie=edge"']);

};
