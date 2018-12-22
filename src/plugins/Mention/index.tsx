import * as React from 'react';
import { RenderNodeProps, EditorProps, Editor } from 'slate-react';
import { Editor as CoreEditor, Value, Decoration } from 'slate';
import { renderMark } from '../../helpers/mark';
import {
  CONTEXT_MARK_TYPE,
  DECORATION_CLASS_NAME,
  USER_MENTION_NODE_TYPE,
  getInput,
  hasValidAncestors,
  User,
  insertMention
} from './helper';
import SuggestionContainer from './SuggestionContainer';
import { IconButton } from '../../components/Button';
import { MentionIcon } from '../../components/Icon';

interface IOptions {
  editorRef: React.RefObject<Editor>;
  suggestionNode: (
    keywords: string,
    onSelect: (data: User) => void
  ) => React.ReactNode;
}

function MentionPlugin({ editorRef, suggestionNode }: IOptions) {
  let lastInputValue: string | null | undefined;
  let suggestionRef = React.createRef<any>();

  return {
    // 禁止光标进入mention区域
    schema: {
      inlines: {
        [USER_MENTION_NODE_TYPE]: {
          isVoid: true
        }
      }
    },

    onKeyDown(e: KeyboardEvent, editor: CoreEditor, next: () => void) {
      // 控制suggestion组件的 上 / 下 / 回车
      if (lastInputValue && suggestionRef.current) {
        const suggestion = suggestionRef.current;
        if (e.keyCode === 40) {
          e.preventDefault();
          suggestion.onDown && suggestion.onDown();
        } else if (e.keyCode === 38) {
          e.preventDefault();
          suggestion.onUp && suggestion.onUp();
        } else if (e.keyCode === 13) {
          e.preventDefault();
          suggestion.onEnter && suggestion.onEnter();
        } else {
          return next();
        }
      } else {
        return next();
      }
    },

    // renderMark用于临时渲染decoration
    renderMark: renderMark({
      type: CONTEXT_MARK_TYPE,
      tagName: 'span',
      attributes: { className: DECORATION_CLASS_NAME }
    }),

    // renderNode用于常规渲染
    // 注意这里使用的是node.text, 所以不能直接使用helper/renderNode公共方法
    renderNode(props: RenderNodeProps, editor: CoreEditor, next: () => any) {
      const { attributes, node } = props;

      if (node.type === USER_MENTION_NODE_TYPE) {
        return <b {...attributes}>{node.text}</b>;
      }
      return next();
    },

    renderButton(editor: CoreEditor) {
      return (
        <IconButton onMouseDown={() => editor.insertText('@').focus()}>
          <MentionIcon />
        </IconButton>
      );
    },

    onAfterChange({ value }: { value: Value }) {
      const inputValue = getInput(value);
      if (inputValue === lastInputValue) return;

      lastInputValue = inputValue;

      const { selection } = value;

      // 清洗, 避免重复
      let decorations = value.decorations.filter(
        (d: Decoration) => !!(d.mark && d.mark.type !== CONTEXT_MARK_TYPE)
      );
      if (typeof inputValue === 'string' && hasValidAncestors(value)) {
        decorations = (decorations as any).push({
          anchor: {
            key: selection.start.key,
            offset: selection.start.offset - inputValue.length
          },
          focus: {
            key: selection.start.key,
            offset: selection.start.offset
          },
          mark: {
            type: CONTEXT_MARK_TYPE
          }
        });
      }

      (editorRef.current as any).setDecorations(decorations);
    },

    renderEditor(props: EditorProps, editor: CoreEditor, next: () => any) {
      const children = next();
      if (lastInputValue) {
        const onSelect = (data: User) => {
          insertMention({ editor, data, keywords: lastInputValue! });
        };

        return (
          <>
            {children}
            <SuggestionContainer>
              {React.cloneElement(
                suggestionNode(lastInputValue, onSelect) as React.ReactElement<
                  any
                >,
                { ref: suggestionRef }
              )}
            </SuggestionContainer>
          </>
        );
      } else {
        return children;
      }
    }
  };
}

export default MentionPlugin;
