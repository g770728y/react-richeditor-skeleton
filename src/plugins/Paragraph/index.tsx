import * as React from 'react';
import { renderNode } from '../../helpers/block';

const TYPE = 'paragraph';

function ParagraphPlugin(options = {}) {
  return {
    renderNode: renderNode({
      type: TYPE,
      tagName: 'div',
      attributes: { className: 'block' }
    })
  };
}

export default ParagraphPlugin;
