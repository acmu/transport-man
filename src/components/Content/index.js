import React from 'react';
import withLayout from '#components/withLayout';
import { DatePicker } from 'antd';

function testContent() {
  return (
    <div>
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        ...
        <br />
        ...
        <br />
        ...
        <br />
        content
        <DatePicker />
      </div>
    </div>
  );
}

export default withLayout(testContent);
