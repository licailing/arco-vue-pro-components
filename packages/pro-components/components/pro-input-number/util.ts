export function formatterDecimal(
  value: any,
  precision = 2,
  capital = true,
  intPartNumber = 15
) {
  if (typeof value !== 'string' || !value) {
    return { value: '', text: '' };
  }
  const arr = value.split('.', 2);
  let newValue;
  let newValueText;
  let intPart = arr[0];
  if (arr[0].length > intPartNumber) {
    intPart = arr[0].substr(0, intPartNumber);
  }
  newValue = intPart;
  if (capital) {
    newValueText = `${intPart}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    newValueText = intPart;
  }
  if (arr[1]) {
    const num = arr[1].substr(0, precision);
    newValue = `${newValue}${precision === 0 ? '' : '.'}${num}`;
    newValueText = `${newValueText}${precision === 0 ? '' : '.'}${num}`;
  } else if (precision > 0 && value.indexOf('.') > -1) {
    newValue += '.';
    newValueText += '.';
  }
  return { value: newValue, text: newValueText };
}

// 转换中文大写
export function toCapital(money: any, unit: string, precision: number = 2) {
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字
  const cnIntRadice = ['', '拾', '佰', '仟']; // 基本单位
  const cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位
  const cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  const cnInteger = '整'; // 整数金额时后面跟的字符
  const cnIntLast = '元'; // 整型完以后的单位
  const maxNum = 999999999999.9999; // 最大处理的数字
  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseStr = ''; // 输出的中文金额字符串
  let Symbol = ''; // 正负值标记
  if (money === '') {
    return '';
  }
  if (!money) {
    return '';
  }
  money = parseFloat(money);
  // 精度问题
  switch (unit) {
    case '万元':
      money = (money * 1000000) / 100;
      break;
    default:
      break;
  }
  if (money >= maxNum) {
    // toastShort('超出最大处理数字');
    return '';
  }
  if (money === 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
    return '';
  }
  if (money < 0) {
    money = -money;
    Symbol = '负 ';
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    const [part1, part2] = money.split('.');
    IntegerNum = part1;
    DecimalNum = part2.substr(0, precision);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0;
    const IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i++) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; // 归零
        ChineseStr += cnNums[parseInt(n, 10)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') {
    // 小数部分
    const decLen = DecimalNum.length;
    for (let j = 0; j < decLen; j++) {
      const nn = DecimalNum.substr(j, 1);
      if (nn !== '0') {
        ChineseStr += cnNums[Number(nn)] + cnDecUnits[j];
      }
    }
  }
  if (ChineseStr === '') {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (DecimalNum === '') {
    ChineseStr += cnInteger;
  }
  ChineseStr = Symbol + ChineseStr;

  return ChineseStr;
}
