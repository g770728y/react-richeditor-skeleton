import * as React from 'react';
import styles from './styles.css';
import { Editor as CoreEditor } from 'slate';
import { deleteImage } from './helper';

type IProps = {
  src: string;
  selected: boolean;
  editor: CoreEditor;
} & React.ImgHTMLAttributes<any>;

class CustomImage extends React.Component<IProps, {}> {
  deleteImage = () => {
    const { editor } = this.props;
    deleteImage(editor);
  };

  render() {
    const { editor, src, selected, ...rest } = this.props;
    const boxShadow = selected ? '0 0 0 2px #0084ff' : 'none';

    return (
      <div className={styles.customImageContainer} style={{}} {...rest}>
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <img src={src} className={styles.image} style={{ boxShadow }} />
          <div
            className={`${styles.circleButton} custom-image-circle-button`}
            onClick={this.deleteImage}
          >
            x
          </div>
        </div>
      </div>
    );
  }
}

export default CustomImage;
