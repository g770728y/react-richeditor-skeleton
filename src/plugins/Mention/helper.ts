import { Value } from 'slate';
import { Editor as CoreEditor } from 'slate';

export const CONTEXT_MARK_TYPE = 'mention-context';
export const DECORATION_CLASS_NAME = '__mention-context__';
export const USER_MENTION_NODE_TYPE = 'user-mention';
export const CAPTURE_REGEX = /(@\S*)$/;

// 注意: 返回的字符串应包含 @ 字符
export function getInput(value: Value) {
  if (!value.startText) return;

  const startOffset = value.selection.start.offset;
  const textBefore = value.startText.text.slice(0, startOffset);
  const result = CAPTURE_REGEX.exec(textBefore);

  return result && result[1];
}

export function hasValidAncestors(value: Value) {
  const { document, selection } = value;

  // 目前是限制只能在paragrapph下使用@
  // 如需扩展, 直接加上 bold / italic 等
  const invalidParent = document.getClosest(
    selection.start.key as any,
    node => (node as any).type !== 'paragraph'
  );

  return !invalidParent;
}

export interface User {
  name: string;
  [key: string]: any;
}

interface InsertMentionProps {
  editor: CoreEditor;
  data: User;
  keywords: string;
}

export function insertMention({ editor, data, keywords }: InsertMentionProps) {
  editor.deleteBackward(keywords.length);

  const selectedRange = editor.value.selection;

  editor
    .insertInlineAtRange(selectedRange as any, {
      data,
      nodes: [
        {
          object: 'text',
          leaves: [
            {
              text: `@${data.name}`
            }
          ]
        }
      ] as any,
      type: USER_MENTION_NODE_TYPE
    })
    .insertText(' ')
    .focus();
}
