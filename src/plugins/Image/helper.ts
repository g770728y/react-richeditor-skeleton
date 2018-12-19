import { Editor as CoreEditor, Range, Block } from 'slate';
import isEmptyStr from '../../helpers/utils';

export const TYPE = 'image';

export function hasImage(editor: CoreEditor) {
  return editor.value.blocks.some((block: Block) => block.type === TYPE);
}

export function isImage(url: string) {
  return (
    !isEmptyStr(url) &&
    (url.endsWith('.png') ||
      url.endsWith('.jpg') ||
      url.endsWith('.gif') ||
      url.endsWith('.jpeg'))
  );
}

export function insertImage(editor: CoreEditor, src: string, target?: Range) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: 'image',
    data: { src, id: new Date().getTime() }
  });
}

export function deleteImage(editor: CoreEditor) {
  editor.delete();
}
