import * as React from 'react';
import { OrderListIcon } from '../../components/Icon';
import { renderListButton, renderList } from '../../helpers/list';

const TYPE = 'ordered-list';

function OrderedListPlugin(options = {}) {
  return {
    renderNode: renderList([
      { type: TYPE, tagName: 'ol' },
      { type: 'list-item', tagName: 'li' }
    ]),
    renderButton: renderListButton({ type: TYPE, icon: OrderListIcon })
  };
}

export default OrderedListPlugin;
