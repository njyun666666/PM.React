import React from 'react';
import { useTranslation } from 'react-i18next';

interface TranMessageProps {
  messages: {
    [key: string]: string | string[];
  };
}

const FieldMessage = ({ messages }: TranMessageProps) => {
  const { t } = useTranslation();

  return (
    <>
      {Object.entries(messages).map(([key, value]) => (
        <React.Fragment key={key}>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key.toLowerCase() !== 'error' && t(('field.' + key.toLowerCase()) as any) + ' : '
          }

          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            typeof value === 'string' && t(('messages.' + value) as any)
          }

          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value instanceof Array && value.map((val) => t(('messages.' + val) as any)).join(', ')
          }
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

export default FieldMessage;
