import * as React from 'react';
import { UnorderedListIcon } from '../../components/Icon';
import { renderListButton, renderList } from '../../helpers/list';

const TYPE = 'unordered-list';

function UnorderedListPlugin(options = {}) {
  return {
    renderNode: renderList([
      { type: TYPE, tagName: 'ul' },
      { type: 'list-item', tagName: 'li' }
    ]),

    renderButton: renderListButton({ type: TYPE, icon: UnorderedListIcon })
  };
}

export default UnorderedListPlugin;
