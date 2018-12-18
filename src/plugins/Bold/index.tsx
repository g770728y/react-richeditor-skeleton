import { BoldIcon } from '../../components/Icon';
import { onKeyDown, renderMark, renderMarkButton } from '../../helpers/mark';

const TYPE = 'bold';

function BoldPlugin(options = {}) {
  return {
    onKeyDown: onKeyDown({ type: TYPE, hotkey: 'mod+b' }),

    renderMark: renderMark({ type: TYPE, tagName: 'strong' }),

    renderButton: renderMarkButton({ type: TYPE, icon: BoldIcon })
  };
}

export default BoldPlugin;
