import * as React from 'react';
import { renderNodeButton, renderNode } from '../../helpers/block';
import { QuoteIcon } from '../../components/Icon';

const TYPE = 'block-quote';

function BlockQuotePlugin(options = {}) {
  return {
    renderNode: renderNode({
      type: TYPE,
      tagName: 'blockquote'
    }),
    renderButton: renderNodeButton({ type: TYPE, icon: QuoteIcon })
  };
}

export default BlockQuotePlugin;
