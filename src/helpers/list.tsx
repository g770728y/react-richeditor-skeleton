import * as React from 'react';
import { hasBlock } from './block';
import { Editor as CoreEditor, Block } from 'slate';
import { IconButton } from '../components/Button';
import { DEFAULT_NODE } from '../constants';
export { renderNode as renderList } from './block';

const onClickList = (
  editor: CoreEditor,
  event: React.MouseEvent,
  type: string
) => {
  event.preventDefault();

  const { value } = editor;
  const { blocks, document } = value;

  const isList = hasBlock(editor, 'list-item');
  const isType = blocks.some(
    (block: Block) =>
      !!document.getClosest(block.key, (parent: Block) => parent.type === type)
  );

  if (isList && isType) {
    // 已经是指定类型,则toggle
    editor
      .setBlocks(DEFAULT_NODE)
      .unwrapBlock('ordered-list')
      .unwrapBlock('unordered-list');
  } else if (isList) {
    editor
      .unwrapBlock('ordered-list')
      .unwrapBlock('unordered-list')
      .wrapBlock(type);
  } else {
    editor.setBlocks('list-item').wrapBlock(type);
  }
};

export function renderListButton({
  type,
  icon
}: {
  type: string;
  icon: React.FunctionComponent;
}) {
  return function renderButton(editor: CoreEditor) {
    let isActive = false;
    const IconClass = icon;

    const {
      value: { document, blocks }
    } = editor;
    if (blocks.size > 0) {
      const parent = document.getParent(blocks.first().key);
      isActive = !!(
        hasBlock(editor, 'list-item') &&
        parent &&
        (parent as Block).type === type
      );
    }

    return (
      <IconButton
        active={isActive}
        onMouseDown={event => onClickList(editor, event, type)}
      >
        <IconClass />
      </IconButton>
    );
  };
}
