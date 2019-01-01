import React from 'react';
import {Editor, EditorState, CompositeDecorator} from 'draft-js';
import RegexSpanDecorator from './RegexSpanDecorator.js';
import detectHeadings from './DetectHeadings.js';
import resetBlockStyle from './ResetBlockStyle.js';

const divStyle = {
    border : "1px solid gray",
    width  : "600px",
    margin : "10px",
    padding : "50px"
  }

const decorators = new CompositeDecorator([
    new RegexSpanDecorator(/(?<=\*)\w.*\w(?=\*)/g, {fontWeight: "bold"}),
    new RegexSpanDecorator(/(?<=_)(\w|\s)*(?=_)/g, {fontStyle: "italic"} )
]);

class BulletEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(decorators),
        };
        this.onEditorStateChanged = this.onEditorStateChanged.bind(this);
        this.onReturnKeyPressed = this.onReturnKeyPressed.bind(this);
    }

    onEditorStateChanged(editorState) {
        var updatedState = detectHeadings(editorState);
        if (editorState.getLastChangeType() === "split-block") {
            updatedState = resetBlockStyle(updatedState);
        }
        this.setState({editorState: updatedState});
    }
    
    render() {
        return (
            <div style={divStyle}>
                <Editor editorState={this.state.editorState} 
                    onChange={this.onEditorStateChanged}
                    handleReturn={this.onReturnKeyPressed} />
            </div>
        );
    }

    onReturnKeyPressed(e, editorState) {
        this.props.onNewLineEntered();
        return 'not-handled'; // as required by draft
    }
}

export default BulletEditor;
