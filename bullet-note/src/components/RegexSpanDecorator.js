import React from 'react';

export default class RegexSpanDecorator {
    constructor(regex, style) {
        this.regex = regex;
        this.style = style
        this.strategy = this.strategy.bind(this);
        this.component = this.component.bind(this);
    }

    strategy(contentBlock, callback, contentState) {
        const text = contentBlock.getText();
        let matchArr, start;
        while ((matchArr = this.regex.exec(text)) !== null) {
         start = matchArr.index;
         callback(start, start + matchArr[0].length);
        }
    }

    component(props) {
        return <span {...props} style={this.style}>{props.children}</span>
    }
}
