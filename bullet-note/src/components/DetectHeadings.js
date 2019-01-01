// @flow
import {EditorState} from 'draft-js';

const headerMap = {
    "# "     : "header-one",
    "## "    : "header-two",
    "### "   : "header-three",
    "#### "  : "header-four",
    "##### " : "header-five",
    "###### ": "header-six"
 }

export default function detectHeadings(editorState) {
        var contentState = editorState.getCurrentContent();
        var blocks = contentState.getBlocksAsArray();
        var updatedBlocks = {};
        var count = 0;

        blocks.forEach(block => {
            var text = block.getText();
            var headingRegex = /^(\#{1,6}\s)/g;
            var found = text.match(headingRegex);
            if (found) {
                var headerType   = headerMap[found[0]];
                var updatedBlock = block.set("type", headerType);
                updatedBlocks[updatedBlock.getKey()] = updatedBlock;
                count++;
            } else {
                if (block.getType().startsWith("header")) {
                    var updatedBlock = block.set("type", "unstyled");
                    updatedBlocks[updatedBlock.getKey()] = updatedBlock;
                    count++;
                }
            }
        });
        if (count > 0) {
            var newBlockMap = contentState.getBlockMap().merge(updatedBlocks);
            var updatedContentState = contentState.set('blockMap', newBlockMap);
            var newEditorState = EditorState.set(editorState, { currentContent : updatedContentState});
            return newEditorState;
        }
        else {
            return editorState;
        }
    };
