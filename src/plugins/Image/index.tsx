import * as React from 'react';
import { RenderNodeProps, EditorProps } from 'slate-react';
import { Editor as CoreEditor, Block } from 'slate';
import ImageButton from './ImageButton';
import { TYPE } from './helper';
import CustomImage from './CustomImage';

function ImagePlugin(options?: {}) {
  return {
    renderNode(props: RenderNodeProps, editor: CoreEditor, next: () => any) {
      const { attributes, node, isFocused } = props;

      if (node.type === TYPE) {
        const src = node.data.get('src');
        return (
          <CustomImage
            editor={editor}
            src={src}
            selected={isFocused}
            {...attributes}
          />
        );
      }
      return next();
    },

    renderButton(editor: CoreEditor) {
      return <ImageButton editor={editor} />;
    },

    schema: {
      document: {
        last: { type: 'paragraph' },
        normalize: (editor: CoreEditor, { code, node, child }: any) => {
          switch (code) {
            case 'last_child_type_invalid': {
              const paragraph = Block.create('paragraph');
              return editor.insertNodeByKey(
                node.key,
                node.nodes.size,
                paragraph
              );
            }
            default:
              return editor;
          }
        }
      },
      blocks: {
        image: {
          isVoid: true
        }
      }
    }
  };
}

export default ImagePlugin;
