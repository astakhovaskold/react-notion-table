import React from 'react';
import Text from '../img/Text';
import Hash from '../img/Hash';
import Multi from '../img/Multi';

interface DataTypeIconProps {
  dataType: string;
  size?: number;
}

const DataTypeIcon: React.FC<DataTypeIconProps> = ({ dataType, size = 16 }) => {
  switch (dataType) {
    case 'text':
      return <Text size={size} />;
    case 'number':
      return <Hash size={size} />;
    case 'select':
      return <Multi size={size} />;
    default:
      return <Text size={size} />;
  }
};

export default DataTypeIcon;
