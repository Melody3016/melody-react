import { Input, Spin, Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import { useEffect, useMemo, useState } from 'react';
import util from '@/libs/util';

const { Search } = Input;

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};
const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title: title as string });
    if (node.children) {
      generateList(node.children);
    }
  }
};

interface MyTreePropType {
  permissionData: IPermissionRes[];
  setSelectItem: React.Dispatch<
    React.SetStateAction<{
      key: string;
      title: string;
    }>
  >;
}
const MyTree: React.FC<MyTreePropType> = ({ permissionData, setSelectItem }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [defaultData, setDefaultData] = useState<DataNode[]>([]);
  const [loading, setLoading] = useState(true);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setExpandedKeys([]);
      setSearchValue(value);
      setAutoExpandParent(true);
      return;
    }
    const newExpandedKeys = dataList
      .map(item => {
        const { title } = item;
        if (String(title).indexOf(value) > -1) {
          return getParentKey(item.key, defaultData);
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const treeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map(item => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{strTitle}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key
        };
      });

    return loop(defaultData);
  }, [searchValue, defaultData]);

  const handleClick = selectedKeys => {
    // 根据key，找到title
    const key = selectedKeys[0];
    const title = dataList.find(item => item.key === key)?.title || '';
    setSelectItem({
      key,
      title
    });
  };

  useEffect(() => {
    const transData = util.transToDataNode(permissionData);
    setDefaultData(transData);
    generateList(transData);
    setLoading(false);
  }, [permissionData]);

  return (
    <>
      <Search placeholder='输入菜单名搜索' style={{ marginBottom: 8 }} onChange={onChange} />
      <Spin
        spinning={loading}
        style={{
          height: 150
        }}
      >
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={treeData}
          onSelect={handleClick}
        />
      </Spin>
    </>
  );
};
export default MyTree;
