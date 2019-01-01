import {EditorState} from 'draft-js'

export default function resetBlockStyle(editorState) {
               
        var sel = editorState.getSelection();
        var currentBlockKey = sel.getStartKey();
        var currentContent = editorState.getCurrentContent();
        var currentBlock = currentContent.getBlockForKey(currentBlockKey);
        var updatedBlock = currentBlock.set('type', 'unstyled');
        var updates =  {};
        updates[updatedBlock.getKey()] = updatedBlock;
        var newBlockMap = currentContent.getBlockMap().merge(updates);
        var updatedContentState = currentContent.set('blockMap', newBlockMap);
        var newEditorState = EditorState.set(editorState, { currentContent : updatedContentState});
        return newEditorState;
}