import { Badge } from '@arco-design/web-vue';
import { StatusType } from '../interface';

/**
 * 快捷操作，用于快速的展示一个状态
 */
const Status: StatusType = {
  Success: ({ text }) => <Badge status="success" text={text} />,
  Error: ({ text }) => <Badge status="danger" text={text} />,
  Default: ({ text }) => <Badge status="normal" text={text} />,
  Processing: ({ text }) => <Badge status="processing" text={text} />,
  Warning: ({ text }) => <Badge status="warning" text={text} />,
};

export default Status;
