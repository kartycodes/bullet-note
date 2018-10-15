import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

class BulletEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ));
    }

    render() {
        return (
            <div>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <Editor editorState={this.state.editorState} onChange={this.onChange} />
            </div>
        );
    }
}

export default BulletEditor;