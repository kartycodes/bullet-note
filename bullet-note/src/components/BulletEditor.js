import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

const divStyle = {
    border : "1px solid gray",
    width  : "600px",
    margin : "10px",
    padding : "50px"
  }

const Empty = Symbol('empty');
const NewLine = Symbol('newLine');
const Typing = Symbol('typing');

class BulletEditor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            lineState : Empty
        };
        this.onEditorStateChanged = this.onEditorStateChanged.bind(this);
    }

    onEditorStateChanged(editorState) {
        switch(this.state.lineState) {
            case Empty: 
                if (editorState.getLastChangeType() === "insert-characters") {
                    this.setState({lineState : Typing});
                }
                break;
            
            case Typing: 
                if (editorState.getLastChangeType() === "split-block") {
                    this.setState({lineState : NewLine});
                    this.props.onNewLineEntered();
                }
                break;
            case NewLine: 
                if (editorState.getLastChangeType() === "insert-characters") {
                    this.setState({lineState : Typing});
                }
                break;
        }
    
         this.setState({editorState: editorState});
        
    }

    render() {
        return (
            <div style={divStyle}>
                <Editor editorState={this.state.editorState} 
                    onChange={this.onEditorStateChanged} />
            </div>
        );
    }

    // componentDidUpdate() {
    //     if (this.state.newLine === true &&
    //         this.state.editorState.getLastChangeType() === "split-block") {
    //             this.setState({enteredNewLine: false});
    //         }
    // }
}

export default BulletEditor;
