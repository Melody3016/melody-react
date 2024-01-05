import { Alert, Space, Table } from 'antd';
import { useState } from 'react';
import type { TableProps } from 'antd/es/table';
import style from './index.scss';

interface MyTableProp extends TableProps<any> {
  onClean?: Function;
}
// const MyTable = <T extends React.FC>({ columns, data }: MyTableProp<T>) => {
const MyTable: React.FC<MyTableProp> = ({ ...props }) => {
  const [selectCount, setSelectCount] = useState(0);

  const infoMsg = (
    <div>
      <Space size='middle'>
        <span>
          已选择 <span style={{ color: '#0074a6' }}>{selectCount}</span> 项
        </span>
        <span style={{ color: '#0074a6', cursor: 'pointer' }}>清空</span>
      </Space>
    </div>
  );
  return (
    <div className={style.MyTable}>
      {/* 选中信息 */}
      <Alert message={infoMsg} type='info' showIcon style={{ marginBottom: 10 }} />
      {/* 表格主体 */}
      <Table {...props} />
    </div>
  );
};
export default MyTable;
