import * as React from 'react';
import { RenderNodeProps } from 'slate-react';
import { Editor as CoreEditor, Block } from 'slate';
import { IconButton } from '../components/Button';
import { DEFAULT_NODE } from '../constants';

export const hasBlock = (editor: CoreEditor, type: string) => {
  const { value } = editor;
  return value.blocks.some((node: Block) => node.type === type);
};

const onClickBlock = (
  editor: CoreEditor,
  event: React.MouseEvent,
  type: string
) => {
  event.preventDefault();

  const isActive = hasBlock(editor, type);
  const isList = hasBlock(editor, 'list-item');

  if (isList) {
    editor
      .setBlocks(isActive ? DEFAULT_NODE : type)
      .unwrapBlock('ordered-list')
      .unwrapBlock('unordered-list');
  } else {
    editor.setBlocks(isActive ? DEFAULT_NODE : type);
  }
};

type RenderNodeArg = {
  type: string;
  tagName: string;
  attributes?: any;
};

type RenderNodeArgs = RenderNodeArg | RenderNodeArg[];

export function renderNode(args: RenderNodeArgs) {
  return function _renderNode(
    props: RenderNodeProps,
    editor: CoreEditor,
    next: () => any
  ) {
    const { children, node, attributes: propAttributes } = props;

    let argsArray = Array.isArray(args) ? args : [args];

    const arg = argsArray.find(({ type }) => type === (node as Block).type);

    if (arg) {
      return React.createElement(
        arg.tagName,
        { ...propAttributes, ...arg.attributes },
        children
      );
    } else {
      return next();
    }
  };
}

export function renderNodeButton({
  type,
  icon
}: {
  type: string;
  icon: React.FunctionComponent;
}) {
  return function renderButton(editor: CoreEditor) {
    let isActive = hasBlock(editor, type);
    const IconClass = icon;

    return (
      <IconButton
        active={isActive}
        onMouseDown={event => onClickBlock(editor, event, type)}
      >
        <IconClass />
      </IconButton>
    );
  };
}
