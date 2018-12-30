import React from 'react';
import {Editor, EditorState, CompositeDecorator} from 'draft-js';
import RegexSpanDecorator from './RegexSpanDecorator.js';

const divStyle = {
    border : "1px solid gray",
    width  : "600px",
    margin : "10px",
    padding : "50px"
  }

class BulletEditor extends React.Component {
    
    constructor(props) {
        super(props);
        
        var decorators = new CompositeDecorator([
            new RegexSpanDecorator(/(?<=\*)(\w|\s)*(?=\*)/g, {fontWeight: "bold"}),
            new RegexSpanDecorator(/(?<=_)(\w|\s)*(?=_)/g, {fontStyle: "italic"} )
        ])
        
        this.state = {
            editorState: EditorState.createEmpty(decorators),
        };
        this.onEditorStateChanged = this.onEditorStateChanged.bind(this);
        this.onReturnKeyPressed = this.onReturnKeyPressed.bind(this);
    }

    onEditorStateChanged(editorState) {
        this.setState({editorState: editorState});
    }

    detectHeading1() {

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
