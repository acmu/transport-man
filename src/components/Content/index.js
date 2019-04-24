import React from 'react';
import withLayout from '#components/withLayout';
import { DatePicker } from 'antd';

function testContent() {
  return (
    <div>
      ...
      <br />
      ...
      <br />
      ...
      <br />
      content
      <DatePicker />
    </div>
  );
}

export default withLayout(testContent);
