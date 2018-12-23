import React from 'react';
import { HeadingIcon } from '../../components/Icon';
import { renderNode, renderNodeButton } from '../../helpers/block';

const TYPE = 'heading';

function HeadingPlugin(options = {}) {
  return {
    renderNode: renderNode({
      type: TYPE,
      tagName: 'h1',
      attributes: { className: 'heading' }
    }),
    renderButton: renderNodeButton({ type: TYPE, icon: HeadingIcon })
  };
}

export default HeadingPlugin;
