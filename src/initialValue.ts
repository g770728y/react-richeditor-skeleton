import { ValueJSON } from 'slate';

const initialValue: ValueJSON = {
  document: {
    object: 'document',
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '在这里输入文字'
              }
            ]
          }
        ]
      }
    ]
  }
};

export default initialValue;
