import { Checkbox, Col, Input, Modal, ModalProps, Row } from 'antd';
import { useEffect, useState } from 'react';
import { exportColumn, exportColumnType } from './exportColumn';
import { getStore } from '@/libs/storage';

interface ModalExportProps extends ModalProps {
  onSubmit: (
    filename: string,
    columnCheckValues: string[],
    columnOptions: exportColumnType[]
  ) => void;
}
const ModalExport: React.FC<ModalExportProps> = ({ onSubmit, ...props }) => {
  const [filename, setFilename] = useState('用户数据');
  // 列数据
  const [columnCheckValues, setColumnCheckValues] = useState<string[]>([]);
  const [columnOptions, setColumnOptions] = useState(exportColumn);
  const onChange = checkedValues => {
    setColumnCheckValues(checkedValues);
  };

  // 提交数据
  const handleOk = () => {
    onSubmit(filename, columnCheckValues, columnOptions);
  };

  useEffect(() => {
    // 初始化导出列数据
    setColumnOptions(preState => {
      const values: string[] = [];
      preState.forEach(e => {
        // 指定列限制权限F
        if (!getStore('roles')?.includes('ROLE_ADMIN') && e.value === 'mobile') {
          const noPermission = '[无权导出]';
          if (e.label.startsWith(noPermission)) return;
          e.label = noPermission + e.label;
          e.disabled = true;
        } else {
          e.disabled = false;
        }
        !e.disabled && values.push(e.value);
      });
      setColumnCheckValues(values);
      return preState;
    });
  }, []);

  return (
    <Modal onOk={handleOk} {...props}>
      <Row justify='space-between' align='middle' style={{ margin: '20px 0' }}>
        <Col span={5}>导出文件名</Col>
        <Col flex={1}>
          <Input value={filename} onChange={e => setFilename(e.target.value)} />
        </Col>
      </Row>
      <Row justify='space-between' align='top' wrap={false} style={{ margin: '20px 0' }}>
        <Col span={5}>自定义导出列</Col>
        <Col flex={1}>
          <Checkbox.Group options={columnOptions} value={columnCheckValues} onChange={onChange} />
        </Col>
      </Row>
    </Modal>
  );
};
export default ModalExport;
