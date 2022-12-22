class forComponent {
    static scrName = '<script>';
    static scrEndName = '</script>';

    static startCovertComponent(){
        const components = document.querySelectorAll('component');
        components.forEach((component, index) => {
            const src = component.getAttribute('src');

            const props = component.getAttribute('props');
            if(props) {
                const propsArray = props.replace(/[{,\n}]/g, '').split(';');
                this.getComponent(src, (res) => {
                    this.addScript(res, (HTML) => {
                        let ConvertedHtml = HTML;
                        propsArray.map((_props) => {
                            const objProps = _props.split(':');
                            const key = objProps[0].replace(/ /g, '');
                            const val = objProps[1];
                            const reg = new RegExp(`{{${key}}}`, 'g');
                            ConvertedHtml = ConvertedHtml.replace(reg, val === `''` ? `` : val);
                        })
                        component.outerHTML = `<!---- THIS COMPONENT URL ${src} -->${ConvertedHtml}`;
                    });
                })
            } else {
                this.getComponent(src, (res) => {
                    this.addScript(res, (HTML) => {
                        component.outerHTML = `<!---- THIS COMPONENT URL ${src} -->${HTML}`;
                    });
                })
            }


            if(components.length > 0 && index === components.length - 1){
                this.startCovertComponent();
                this.startConvertFor();
            }
        })
    }

    static addScript(res, calBack){
        if(res.includes(this.scrName)){
            const startIndexOfScript = res.indexOf(this.scrName);
            const endScript = res.indexOf(this.scrEndName);
            const cropString = res.slice(startIndexOfScript + this.scrName.length, endScript);

            const newScript = document.createElement('script');
            newScript.setAttribute('defer', 'true');
            newScript.innerHTML = cropString;
            document.body.appendChild(newScript);

            calBack(res.slice(0, startIndexOfScript));
        } else {
            calBack(res);
        }
    }

    static startConvertFor(){
        const forTag = document.querySelectorAll('for');
        forTag.forEach((item) => {
            let html = item.innerHTML;
            const count = +item.getAttribute('count');
            const data = item.dataset;

            if(count){
                let _html = '';
                for (let i = 0; i < count; i++){
                    let _htm = html;

                    // PRINT INDEX LOOP
                    const reg = new RegExp(`{{index}}`, 'g');
                    _htm =  _htm.replace(reg, String(i));

                    // PRINT RANDOM NUMBER
                    const regRandom = new RegExp(`{{randomNumber}}`, 'g');
                    _htm =  _htm.replace(regRandom, String(Math.floor(Math.random() * 10000)) + 1);

                    for (let key in data){
                        const keyArr = data[key].split(',');
                        const reg = new RegExp(`{{${key}}}`, 'g');
                        _htm =  _htm.replace(reg, keyArr[i] === `''` ? '' : keyArr[i]);
                    }
                    _html += _htm + '\n';
                }
                item.outerHTML = _html;
            }
        })
    }

    static getComponent(url, callBack){
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        callBack(xmlHttp.responseText)
    }
}

forComponent.startCovertComponent();
forComponent.startConvertFor();



console.time();

const colors = {
    white: '#fff',
    black: '#212529',
    grey: '#dadada',
    bodyGrey: '#f6f6f6',
    darkGrey: '#9d9d9d',
    blue: '#326dc7',
    green: '#68d25f',
    yellow: '#ffe',
    red: 'red',
    transparent: 'rgba(0,0,0,0)'
}


// FOR COMPONENTS
const costs = {
    bgBlur: 'bgBlur-',
    color: 'c-',
    bgc: 'bgc-',
    fw: 'fw-',
    zIndex: 'z-',
    opacity: 'op-'
}
const allElem = document.querySelectorAll('*');
const head = document.head;

const sizes = [
    {sizeName: 'sm', size: 576},
    {sizeName: 'md', size: 768},
    {sizeName: 'lg', size: 992},
    {sizeName: 'xl', size: 1200},
    {sizeName: 'xxl', size: 1400}
];

const classTypes = [
    {minClass: 'h-', styleName: 'height'},
    {minClass: 'mh-', styleName: 'max-height'},
    {minClass: 'w-', styleName: 'width'},
    {minClass: 'mw-', styleName: 'max-width'},
    {minClass: 'minw-', styleName: 'min-width'},
    // MARGIN
    {minClass: 'me-', styleName: 'margin-right'},
    {minClass: 'ms-', styleName: 'margin-left'},
    {minClass: 'mt-', styleName: 'margin-top'},
    {minClass: 'mb-', styleName: 'margin-bottom'},
    {minClass: 'm-', styleName: 'margin'},
    // PADDING
    {minClass: 'pe-', styleName: 'padding-right'},
    {minClass: 'ps-', styleName: 'padding-left'},
    {minClass: 'pt-', styleName: 'padding-top'},
    {minClass: 'pb-', styleName: 'padding-bottom'},
    {minClass: 'p-', styleName: 'padding'},
    // FONT SIZE
    {minClass: 'fs-', styleName: 'font-size'},
    {minClass: 'br-', styleName: 'border-radius'},
    {minClass: 'roundLeftTop-', styleName: 'border-top-left-radius'},
    {minClass: 'roundLeftBottom-', styleName: 'border-bottom-left-radius'},
    {minClass: 'roundRightBottom-', styleName: 'border-bottom-right-radius'},
    {minClass: 'roundRightTop-', styleName: 'border-top-right-radius'},
    {minClass: 'lh-', styleName: 'line-height'},
    {minClass: 'ls-', styleName: 'letter-spacing'},
    {minClass: 'left-', styleName: 'left'},
    {minClass: 'top-', styleName: 'top'},
    {minClass: 'right-', styleName: 'right'},
    {minClass: 'bottom-', styleName: 'bottom'},
    {minClass: 'fw-', styleName: 'font-weight'},
    {minClass: costs.opacity, styleName: 'opacity'},
    {minClass: costs.zIndex, styleName: 'z-index'},
    {minClass: costs.color, styleName: 'color'},
    {minClass: costs.bgc, styleName: 'background-color'},
    {minClass: costs.bgBlur, styleName: 'backdrop-filter'},
]

const oldClasses = [];

if (typeof colors === 'undefined') {
    const script = document.createElement('script');
    script.innerHTML = `const colors = {}`;
    document.head.appendChild(script)
}

// CREATING STYLE TAGS
const style = document.createElement('STYLE');
const medias = document.createElement('STYLE');

allElem.forEach((item) => {
    item.classList.forEach((className) => {
        const checkingImportant = chekWork(className);
        const type = classTypes.find((classType) => !className.indexOf(checkingImportant + classType.minClass) && !oldClasses.includes(className));
        if (type) {
            const {checkInp, percent, newClassNem} = {
                checkInp: className.includes('!') ? '!important' : '',
                percent: className.includes('%') ? '%' : 'rem',
                newClassNem: className.replace(/[!,%]/g, '')
            }
            const classCount = newClassNem.split('-')[1];
            const classCountTwo = newClassNem.split('-')[2];
            if (+classCount > 5 || +classCountTwo > 5) {
                startCreateStyle(classCountTwo, type, newClassNem, percent, checkInp, classCount, className);
            } else if (!+classCount) {
                startCreateStyle(classCountTwo, type, newClassNem, percent, checkInp, classCount, className);
            }
        }
    })
    if (String(item.className).includes('!') || String(item.className).includes('%')) {
        item.className = item.className.replace(/[!,%]/g, '')
    }
})


function startCreateStyle(classCountTwo, type, newClassNem, percent, checkInp, classCount, className) {
    if (classCountTwo) {
        sizes.forEach((_size) => {
            const mediaClassName = `${type.minClass}${_size.sizeName}`;
            if (newClassNem.includes(mediaClassName) && !oldClasses.includes(className)) {
                oldClasses.push(newClassNem);
                medias.innerHTML = `${medias.innerHTML} @media (min-width: ${_size.size}px){.${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCountTwo)}}}`;
            }
        })
    } else {
        if (newClassNem.includes(type.minClass) && !oldClasses.includes(className)) {
            oldClasses.push(newClassNem);
            style.innerHTML = `${style.innerHTML} .${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCount)}}`;
        }
    }
}


function printStyle(type, className, percent, checkInp, classCount) {
    const percentOrRem = `${className.includes('%') ? classCount : classCount / 16}${percent} ${checkInp}`;
    switch (type.minClass) {
        case costs.fw:
            return classCount;
        case costs.color:
            if (colors[classCount]) {
                const _color = colors[classCount];
                !_color && console.error(`color ${classCount} no added const colors `)
                return _color;
            }
            return '';
        case costs.bgc:
            if (colors[classCount]) {
                const _colorBgc = colors[classCount];
                !_colorBgc && console.error(`background color ${classCount} no added const colors `)
                return _colorBgc;
            }
            return '';
        case costs.bgBlur:
            return `blur(${percentOrRem})`;
        case costs.zIndex:
            return classCount;
        case costs.opacity:
            return +classCount / 10;
        default:
            return `${percentOrRem}`;
    }
}


function chekWork(className) {
    return className.includes('!') ? '!' : className.includes('%') ? '%' : '';
}


head.appendChild(style);
head.appendChild(medias);

console.timeEnd()



