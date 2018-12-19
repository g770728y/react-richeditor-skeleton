import { Editor as CoreEditor, Inline } from 'slate';

export const HoverInputDim = {
  width: 250,
  height: 30
};

export const TYPE = 'link';

export const getLinks = (editor: CoreEditor) => {
  const { value } = editor;
  return value.inlines.find((inline: Inline) => inline.type === TYPE);
};

export const hasLinks = (editor: CoreEditor) => {
  return !!getLinks(editor);
};

export const unwrapLink = (editor: CoreEditor) => {
  editor.unwrapInline(TYPE);
};

export const wrapLink = (editor: CoreEditor, href: string) => {
  editor
    .wrapInline({
      type: TYPE,
      data: { href }
    })
    .moveToEnd();
};
