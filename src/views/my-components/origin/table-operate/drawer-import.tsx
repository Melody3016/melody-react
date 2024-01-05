import {
  Alert,
  Button,
  Col,
  Drawer,
  DrawerProps,
  Row,
  Space,
  Table,
  Upload,
  UploadProps,
  message
} from 'antd';
import { FileAddFilled, RestOutlined } from '@ant-design/icons';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import excel from '@/libs/excel';
import { userData, userColumns } from './importTemplate';
import useAxios from '@/hooks/useAxios';

const infoMsg =
  '导入前请下载查看导入模版数据文件查看所需字段及说明，确保数据格式正确，不得修改列英文名称';
const drawerStyles: DrawerStyles = {
  body: {
    display: 'flex',
    flexDirection: 'column'
  }
};

interface DrawerImportType extends DrawerProps {
  onImportSuccess: () => void;
}
const DrawerImport: React.FC<DrawerImportType> = ({ onImportSuccess, ...props }) => {
  const [reading, setReading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importTableData, setImportTableData] = useState([]);
  const [importColumns, setImportColumns] = useState<any>([]);
  const handleDownTem = () => {
    const title: string[] = [];
    const key: string[] = [];
    userColumns.forEach(e => {
      title.push(e.title);
      key.push(e.key);
    });
    const params = {
      title,
      key,
      data: userData,
      autoWidth: true,
      filename: '导入用户数据模版'
    };
    excel.exportArrayToExcel(params);
  };
  // 导入数据
  const handleImport = () => {
    onImportSuccess();
    /* importUserData(this.importTableData).then(res => {
      this.importLoading = false;
      if (res.success) {
        this.importModalVisible = false;
        this.getDataList();
        this.$Modal.info({
          title: '导入结果',
          content: res.message
        });
      }
    }); */
  };
  const handleBeforeUpload = file => {
    // 读取文件,并转换成表格数据
    const fileExt = file.name.split('.').pop().toLocaleLowerCase();
    if (fileExt === 'xlsx' || fileExt === 'xls') {
      readFile(file);
    } else {
      // Notice.warning({
      //   title: '文件类型错误',
      //   desc: '所选文件‘ ' + file.name + ' ’不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
      // });
    }
    return false;
  };
  const readFile = file => {
    setReading(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onerror = () => {
      setReading(false);
      message.error('文件读取出错');
    };
    reader.onload = e => {
      const data = e.target?.result;
      const { header, results } = excel.read(data, 'array');
      const tableTitle = header.map(item => {
        return { title: item, key: item, dataIndex: item, width: 130, align: 'center' };
      });
      setImportTableData(results);
      setImportColumns(tableTitle);
      setReading(false);
      message.success('读取数据成功');
    };
  };
  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.xls, .xlsx',
    showUploadList: false,
    beforeUpload: handleBeforeUpload
  };
  const footElement = (
    <Row justify='space-between' align='middle'>
      <Col>
        <Button type='primary' onClick={handleDownTem}>
          下载导入模板
        </Button>
      </Col>
      <Col>
        <Space>
          <Button onClick={props.onClose}>关闭</Button>
          <Button loading={importLoading} disabled={!importTableData.length} onClick={handleImport}>
            确认导入
          </Button>
        </Space>
      </Col>
    </Row>
  );
  return (
    <Drawer styles={drawerStyles} footer={footElement} {...props}>
      <Row justify='space-between' align='middle' style={{ marginBottom: 10 }}>
        <Col>
          <Upload {...uploadProps}>
            <Button loading={reading} icon={<FileAddFilled />}>
              上传Excel文件
            </Button>
          </Upload>
        </Col>
        <Col>
          <Button
            icon={<RestOutlined />}
            onClick={() => {
              setImportColumns([]);
              setImportTableData([]);
            }}
          >
            清空数据
          </Button>
        </Col>
      </Row>
      <Alert message={infoMsg} type='warning' showIcon style={{ marginBottom: 10 }} />
      <div
        style={{
          border: '1px solid #dcdee2',
          flex: 1
        }}
      >
        {importTableData.length ? (
          <Table
            bordered
            columns={importColumns}
            dataSource={importTableData}
            pagination={false}
            scroll={{
              x: 1000,
              y: 350
            }}
          />
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#888'
            }}
          >
            暂无数据
          </div>
        )}
      </div>
    </Drawer>
  );
};
export default DrawerImport;
