import * as React from 'react';
import { Editor as CoreEditor } from 'slate';
import { IconButton } from '../../components/Button';
import { ImageIcon } from '../../components/Icon';
import { insertImage } from './helper';

type IProps = {
  editor: CoreEditor;
  // 返回http url
  onSave?: (dataUrl: string) => Promise<string>;
};

class ImageButton extends React.Component<IProps, {}> {
  fileInputRef = React.createRef<HTMLInputElement>();

  handleClick = () => {
    this.fileInputRef.current!.click();
  };

  handleFile = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const file = (this.fileInputRef.current!.files as any)[0];

    const reader = new FileReader();

    const self = this;

    reader.onload = function(e: any) {
      const dataurl = e.target.result;
      const { editor, onSave } = self.props;

      if (onSave) {
        onSave(dataurl).then(httpurl => {
          insertImage(editor, httpurl);
        });
      } else {
        insertImage(editor, dataurl);
      }
    };

    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <IconButton onClick={this.handleClick}>
          <ImageIcon />
        </IconButton>
        <input
          ref={this.fileInputRef}
          accept=".png, .jpg, .jpeg, .gif"
          type="file"
          onChange={this.handleFile}
          style={{ position: 'fixed', left: -100000, top: -100000 }}
        />
      </div>
    );
  }
}

export default ImageButton;
