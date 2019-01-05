import React from 'react';
import ReactDOM from 'react-dom';
import {configure, shallow } from 'enzyme';
import {expect} from 'chai';
import {EditorState, ContentState} from 'draft-js'
import resetBlockStyle from './ResetBlockStyle.js';

import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});


it('resets the block style of a new block', () => {
  // setup: create editorstate with a h1 block
  var initialContent = "lineOne";
  var initialContentState = ContentState.createFromText(initialContent);
  var initialBlock = initialContentState.getFirstBlock().set("type", "header-one");
  var initialBlockMap = {};
  initialBlockMap[initialBlock.getKey()] = initialBlock;
  var initialContentState = 
    initialContentState.set("blockMap", 
        initialContentState.getBlockMap().merge(initialBlockMap));
  var inputState = EditorState.createWithContent(initialContentState);
  
  // split a block
  var actualState = resetBlockStyle(inputState);
  var actualBlock = actualState.getCurrentContent().getLastBlock();

  // assert
  expect(actualBlock.getType()).to.equal("unstyled");
});
